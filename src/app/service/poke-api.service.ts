import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private baseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  get apiFetchAllPokemons(): Observable<any> {
    return this.http.get<any>(this.baseUrl).pipe(
      tap(res => {
        res.results.map((resPokemon: any) => {
          this.apiGetPokemons(resPokemon.url).subscribe(
            res => (resPokemon.status = res)
          );
        });
      })
    );
  }

  public apiListAllPokemons(offset: number, limit: number): Observable<any> {
    const url = `${this.baseUrl}?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url).pipe(
      tap(res => {
        res.results.map((resPokemon: any) => {
          this.apiGetPokemons(resPokemon.url).subscribe(
            res => (resPokemon.status = res)
          );
        });
      })
    );
  }

  public apiGetPokemons(url: string): Observable<any> {
    return this.http.get<any>(url).pipe(
      map(
        res => res
      )
    );
  }
}
