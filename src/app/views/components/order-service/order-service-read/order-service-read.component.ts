import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';

@Component({
  selector: 'app-order-service-read',
  templateUrl: './order-service-read.component.html',
  styleUrls: ['./order-service-read.component.css']
})
export class OrderServiceReadComponent implements AfterViewInit {

  lista: OrdemServico[] = [];

  displayedColumns: string[] = ['id', 'tecnico', 'cliente', 'abertura',
    'fechamento', 'prioridade', 'status', 'actions'];
  dataSource = new MatTableDataSource<OrdemServico>(this.lista);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private ordemServicoService: OrdemServicoService,
    private router: Router) {

  }

  ngAfterViewInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.ordemServicoService.findAll().subscribe((resposta) => {
      this.lista = resposta;
      this.dataSource = new MatTableDataSource<OrdemServico>(this.lista);
      this.dataSource.paginator = this.paginator;
    })
  }

  public navigateToCreate(): void {
    this.router.navigate(['ordem-servico/create']);
  }

}
