import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { ClienteService } from 'src/app/services/clientes.service';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';
import { TecnicosService } from 'src/app/services/tecnicos.service';

@Component({
  selector: 'app-order-services-closed',
  templateUrl: './order-services-closed.component.html',
  styleUrls: ['./order-services-closed.component.css']
})
export class OrderServicesClosedComponent implements AfterViewInit {

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
      resposta.forEach(x => {
        if (x.status == "ENCERRADO"){
          this.lista.push(x);
        }
      })
      this.listarTecnico();
      this.listarCliente();
      this.dataSource = new MatTableDataSource<OrdemServico>(this.lista);
      this.dataSource.paginator = this.paginator;
    })
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

  public setarCorPrioridade(x: any): String {
    if (x == 'BAIXA'){
      return 'baixa';
    }
    if (x == 'MEDIA') {
      return 'media';
    }
    return 'alta';
  }

}

