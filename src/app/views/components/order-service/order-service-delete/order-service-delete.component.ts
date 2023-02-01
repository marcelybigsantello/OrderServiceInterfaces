import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { OrdemServico } from 'src/app/models/ordem-servico';
import { Tecnico } from 'src/app/models/tecnico';
import { MessageService } from 'src/app/services/message.service';
import { OrdemServicoService } from 'src/app/services/ordem-servico.service';

const exclusaoSucesso = 'Ordem de Serviço excluída com sucesso!';

@Component({
  selector: 'app-order-service-delete',
  templateUrl: './order-service-delete.component.html',
  styleUrls: ['./order-service-delete.component.css']
})
export class OrderServiceDeleteComponent implements OnInit {

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

  constructor(private service: OrdemServicoService,
    private messageService: MessageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  public delete(): void {
    this.service.delete(this.ordemServico).subscribe(ret => {
      this.ordemServico = ret;
      this.messageService.generateMessage(exclusaoSucesso);
    }, err => {
      console.log(err);
    })
  }

  public cancel(): void {
    this.router.navigate(['ordem-servico']);
  }

}
