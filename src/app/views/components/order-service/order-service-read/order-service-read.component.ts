import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { ClienteService } from 'src/app/services/clientes.service';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';
import { TecnicosService } from 'src/app/services/tecnicos.service';

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
    private router: Router,
    private tecnicoService: TecnicosService,
    private clienteService: ClienteService) {

  }

  ngAfterViewInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.ordemServicoService.findAll().subscribe((resposta) => {
      this.lista = resposta;
      this.listarTecnico();
      this.listarCliente();
      this.dataSource = new MatTableDataSource<OrdemServico>(this.lista);
      this.dataSource.paginator = this.paginator;
    })
  }

  public navigateToCreate(): void {
    this.router.navigate(['ordem-servico/create']);
  }

  public listarTecnico(): void {
    this.lista.forEach(x => {
      this.tecnicoService.findById(x.tecnico).subscribe(resposta => {
        x.tecnico = resposta.nome;
      })
    })
  }

  public listarCliente(): void {
    this.lista.forEach(x => {
      this.clienteService.findById(x.cliente).subscribe(ret => {
        x.cliente = ret.nome;
      })
    })
  }

}
