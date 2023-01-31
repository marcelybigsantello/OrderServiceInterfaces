import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { Tecnico } from 'src/app/models/tecnico';
import { ClienteService } from 'src/app/services/clientes.service';
import { MessageService } from 'src/app/services/message.service';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';
import { TecnicosService } from 'src/app/services/tecnicos.service';

const mensagemCadastroSucesso = 'Ordem de Serviço cadastrada com sucesso!';
const clienteOuTecnicoVazio = 'Favor informar o Cliente ou o Técnico';

@Component({
  selector: 'app-order-service-create',
  templateUrl: './order-service-create.component.html',
  styleUrls: ['./order-service-create.component.css']
})
export class OrderServiceCreateComponent implements OnInit {

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
    private router: Router) { }

  ngOnInit(): void {
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

  public create(): void {
    this.service.create(this.ordemServico).subscribe(ret => {
      this.messageService.generateMessage(mensagemCadastroSucesso);
      this.router.navigate(['ordem-servico']);
    }, err => {
      if (err.error.message.match('The given id must not be null!;')){
        this.messageService.generateMessage(clienteOuTecnicoVazio);
      }
    })
  }

  public cancel(): void {
    this.router.navigate(['ordem-servico']);
  }

}
