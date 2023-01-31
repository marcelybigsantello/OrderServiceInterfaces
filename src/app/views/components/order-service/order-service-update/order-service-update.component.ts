import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/clientes.service';
import { MessageService } from 'src/app/services/message.service';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';
import { TecnicosService } from 'src/app/services/tecnicos.service';

const mensagemAlteracaoSucesso = 'Ordem de Serviço atualizada com sucesso!';
const clienteOuTecnicoVazio = 'Favor informar o Cliente ou o Técnico';

@Component({
  selector: 'app-order-service-update',
  templateUrl: './order-service-update.component.html',
  styleUrls: ['./order-service-update.component.css']
})
export class OrderServiceUpdateComponent implements OnInit {

  ordemServico: OrdemServico = {
    id: '',
    cliente: '',
    tecnico: '',
    status: '',
    prioridade: '',
    observacoes: ''
  }

  tecnicos: Tecnico[] = [];
  clientes: Cliente[] = [];

  constructor(private tecnicoService: TecnicosService,
    private clienteService: ClienteService,
    private service: OrdemServicoService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.ordemServico.id = this.route.snapshot.paramMap.get('id');
    this.findById();
    this.listarTecnicos();
    this.listarClientes();
  }

  public listarTecnicos(): void {
    this.tecnicoService.findAll().subscribe(ret => {
      this.tecnicos = ret;
    })
  }

  public listarClientes(): void {
    this.clienteService.findAll().subscribe(ret => {
      this.clientes = ret;
    })
  }

  public update(): void {
    this.service.update(this.ordemServico).subscribe(ret => {
      this.messageService.generateMessage(mensagemAlteracaoSucesso);
      this.router.navigate(['ordem-servico']);
    })
  }

  public findById(): void {
    this.service.findById(this.ordemServico.id).subscribe(ret => {
      this.ordemServico = ret;
      this.converteDados();
    })
  }

  public cancel(): void {
    this.router.navigate(['ordem-servico']);
  }

  public converteDados(): void {
    if (this.ordemServico.status == "ABERTO"){
      this.ordemServico.status = 0;
    }
    else if (this.ordemServico.status == "ANDAMENTO") {
      this.ordemServico.status = 1;
    }
    else {
      this.ordemServico.status = 2;
    }

    if (this.ordemServico.prioridade == "BAIXA"){
      this.ordemServico.prioridade = 0;
    }
    else if (this.ordemServico.prioridade == "MEDIA") {
      this.ordemServico.prioridade = 1;
    }
    else {
      this.ordemServico.prioridade = 2;
    }
  }

}
