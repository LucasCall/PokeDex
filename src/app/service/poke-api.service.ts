import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  private url: string = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0'

  constructor(private http: HttpClient) { }

  get apiListAllPokemons():Observable<any>{
    return this.http.get<any>(this.url).pipe(
      tap(res => res),
      tap(res => {
        res.results.map((resPokemon: any) => {
          
         this.apiGetPokemons(resPokemon.url).subscribe(
          res => resPokemon.status = res
         )
        })
      })
    )
  }

  public apiGetPokemons(url: string):Observable<any>{
    return this.http.get<any>(url).pipe(
      map(
        res => res
      )
    );
  }
}
