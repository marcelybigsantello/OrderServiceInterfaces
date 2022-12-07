import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicosService } from 'src/app/services/tecnicos.service';

@Component({
  selector: 'app-tecnico-read',
  templateUrl: './tecnico-read.component.html',
  styleUrls: ['./tecnico-read.component.css']
})
export class TecnicoReadComponent implements AfterViewInit {

  tecnicos: Tecnico[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'grauInstrucao'];
  dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private tecnicoService: TecnicosService,
    private router: Router) {

  }
  
  ngAfterViewInit(): void {
    this.findAll();
  }
  
  public findAll(): void {
    this.tecnicoService.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
      this.dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);
      this.dataSource.paginator = this.paginator;
    })
  }

  public navigateToCreate(): void {
    this.router.navigate(['tecnicos/create']);
  }

  
}
