import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgFor } from '@angular/common';
import { filter, map } from 'rxjs';
export interface Avtor {
  "id": number,
  "ime": string,
  "prezime": string,
  "godinaNaRagjanje": number,
  "zemja": string,
  "books": string[]
};

export interface Member {
  "id": number,
  "ime": string,
  "prezime": string,
  "telefonskiBroj": number,
  "leases": any[]
}

export interface Book {
  "id"	: number,
  "naslov" :	string,
  "avtorId"	: number,
  "izdavackaKukja"	: string,
  "godina"	: number,
  "isbn"	: number,
  "kategorijaId"	: number,
  "jazik"	: string,
  "status" : string,
}

@Injectable({
  providedIn: 'root'
})
export class RESTAPIServiceService {

  constructor(private http: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  postBlog(blog: any) {
    let url = "http://localhost:3000/blogs";
    return this.http.post(url, blog, this.httpOptions);
  }

  getAuthors() {
    let url = "http://localhost:5082/api/Avtor";
    return this.http.get<Avtor[]>(url, this.httpOptions);
  }

  getAuthor(authorName : string) {
    let url = "http://localhost:5082/api/Avtor";
    let res =  this.http.get<Avtor[]>(url, this.httpOptions);
  }  

  getMember(memberName : string) {
    let url = "http://localhost:5082/api/Member";
    let res = this.http.get<Member[]>(url, this.httpOptions);
  /*  return res.pipe(map((members, i) => {
      return members.filter((clen) => (clen.ime + "-" + clen.prezime).toUpperCase().includes(memberName.toUpperCase()))
      }))
  */  
    return res;
  }  

  getMembers() {
    let url = "http://localhost:5082/api/Member";
    let res = this.http.get<Member[]>(url, this.httpOptions);
    return res;
  }  

  getBooks() {
    let url = "http://localhost:5082/api/Book";
    let res = this.http.get<Book[]>(url, this.httpOptions);
    return res;
  }  

  leaseBook(book : Book, member : Member) : void {
    //TBD
    let url = "http://localhost:5082/api/Lease";
    let b  = {
    //  "id": 0,
      "bookId": book.id,
      "memberId": member.id,
      "dateLeased": new Date(),
      "dateReturned": null
    }
    let res = this.http.put(url, b);

  }

  returnBook(book : Book, member : Member) : void {
    //TBD
  }

}
