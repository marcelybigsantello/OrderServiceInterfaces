import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { ClienteService } from 'src/app/services/clientes.service';
import { MessageService } from 'src/app/services/message.service';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';
import { TecnicosService } from 'src/app/services/tecnicos.service';

@Component({
  selector: 'app-order-service-view',
  templateUrl: './order-service-view.component.html',
  styleUrls: ['./order-service-view.component.css']
})
export class OrderServiceViewComponent implements AfterViewInit {

  os: OrdemServico[] = [];

  ordemServico: OrdemServico = {
    id: '',
    tecnico: '',
    cliente: '',
    status: '',
    prioridade: '',
    dataAbertura: new Date(),
    dataFechamento: new Date(),
    observacoes: ''
  }

  displayedColumns: string[] = ['id', 'tecnico', 'cliente', 'dataAbertura',
   'observacoes'];
  dataSource = new MatTableDataSource<OrdemServico>(this.os);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private route: ActivatedRoute, 
    private service: OrdemServicoService,
    private router: Router, 
    private tecnicoService: TecnicosService, 
    private clienteService: ClienteService) { }

  ngAfterViewInit(): void {
    this.ordemServico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
  }

  public findById(): void {
    this.service.findById(this.ordemServico.id).subscribe(ret => {
      this.os.push(ret);
      this.listarTecnico();
      this.listarCliente();
      this.dataSource = new MatTableDataSource<OrdemServico>(this.os);
      this.dataSource.paginator = this.paginator;
    })
  }

  public listarTecnico(): void {
    this.os.forEach(x => {
      this.tecnicoService.findById(x.tecnico).subscribe(resposta => {
        x.tecnico = resposta.nome;
      })
    })
  }

  public listarCliente(): void {
    this.os.forEach(x => {
      this.clienteService.findById(x.cliente).subscribe(ret => {
        x.cliente = ret.nome;
      })
    })
  }

  public return(): void {
    this.router.navigate(['ordem-servico']);
  }

}
