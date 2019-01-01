import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class StudentService{

    url = "http://localhost:3000/api/";

    constructor(
        private http: Http
    ){}

    getHeaders(){
        let headers = new Headers;
        headers.append('Content-Type','application/json');
        return headers;
    }

    getPersons(): Observable<any>{
       return this.http.get(this.url+"person",{headers: this.getHeaders()}).pipe((map((res) => res.json())));
    }

    addPerson(postData): Observable<any>{
        console.log(postData);
        
       return this.http.post(this.url+"person", postData, {headers: this.getHeaders()}).pipe((map((res) => res.json())));        
    }

    updatePerson(personId, updatedInfo): Observable<any>{
       return this.http.put(this.url+"person/"+personId, updatedInfo, {headers: this.getHeaders()}).pipe((map((res) => res.json())));                
    }

    deletePerson(personId): Observable<any>{
        return this.http.delete(this.url+"person/"+personId, {headers: this.getHeaders()}).pipe((map((res) => res.json())));                        
    }

    getPersonDetails(personId): Observable<any>{
        return this.http.get(this.url+"person/"+personId, {headers: this.getHeaders()}).pipe((map((res) => res.json())));                                
    }
}