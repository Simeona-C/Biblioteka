import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Avtor, Member, Book, RESTAPIServiceService } from './restapiservice.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, JsonPipe, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'angular-biblioteka';
  avtori : Avtor[] = [];
  filtAvtori : Avtor[] = [];
  avtor? : Avtor;
  iminja : string[] = [];
  chlenovi : Member[] = [];
  filtChlenovi : Member[] = [];
  chlen : Member = {
    id : 0,
    ime : "",
    prezime : "",
    telefonskiBroj : 0,
    leases : []
  };
  knigi : Book[] = [];
  filtKnigi : Book[] = [];
  kniga : Book = {
    id : 0,
    avtorId : 0,
    godina : 0,
    isbn : 0,
    izdavackaKukja : "",
    jazik : "",
    kategorijaId : 0,
    naslov : "",
    status : ""
  };
  httpSrv = inject(RESTAPIServiceService);
  sostojba = '---';

  imeChlen = new FormControl('', {nonNullable : true});
  naslovKniga = new FormControl('', {nonNullable : true});

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.httpSrv.getAuthors().subscribe((data) => {
      this.avtori = data;
      this.iminja = data.map((avtor, index, array) => avtor.ime + ' ' + avtor.prezime);
    })
    this.httpSrv.getMembers().subscribe((data) => {this.chlenovi = data});
    this.httpSrv.getBooks().subscribe((data) => {this.knigi = data});
    console.log('Pochetok');
  }

  avtorClick(avtor : Avtor) : void {
    //this.iminja = ['Nema ' + i];
    this.sostojba = 'kliknato ' + avtor.id;
    this.avtor = avtor;
    console.log('Klik', avtor);
  }

  chlenClick(chlen : Member) : void {
    this.chlen = chlen;
  }

  knigaClick(kniga : Book) : void {
    this.kniga = kniga;
  }

  chlenBaraj(memberName : string) : void {
    this.filtChlenovi = this.chlenovi.filter((m) => (m.ime + "-" + m.prezime).toUpperCase().includes(memberName.toUpperCase()));
  }

  knigaBaraj(knigaNaslov : string) : void {
    this.filtKnigi = this.knigi.filter((k) => (k.naslov.toUpperCase().includes(knigaNaslov.toUpperCase())))
  }

  izdadiKniga() : void {
    this.httpSrv.leaseBook(this.kniga, this.chlen);
  }

  vratiKniga() : void {
    // TBD
  }
}

