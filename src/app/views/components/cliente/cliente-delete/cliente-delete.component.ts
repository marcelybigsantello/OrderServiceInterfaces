import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/clientes.service';
import { MessageService } from 'src/app/services/message.service';

const clienteComOrdensServico = 'possui Ordens de Serviço';
const messageExclusaoClienteSucesso = 'Cliente excluído com sucesso!';

@Component({
  selector: 'app-cliente-delete',
  templateUrl: './cliente-delete.component.html',
  styleUrls: ['./cliente-delete.component.css']
})
export class ClienteDeleteComponent implements OnInit {

  constructor(private router: Router,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private route: ActivatedRoute) {

  }

  id_cliente = '';

  cliente: Cliente = {
    nome: '',
    cpf: '',
    telefone: '',
    dataNascimento: new Date(),
    profissao: '',
  };

  ngOnInit(): void {
    this.id_cliente = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  public findById(): void {
    this.clienteService.findById(this.id_cliente).subscribe((resposta) => {
      this.cliente = resposta;
    })
  }

  public delete(): void {
    this.clienteService.delete(this.cliente).subscribe((ret) => {
      this.router.navigate(['clientes']);
      this.messageService.generateMessage(messageExclusaoClienteSucesso);
    }, err => {
      if (err.error.error.match(clienteComOrdensServico)){
        this.messageService.generateMessage(err.error.error);
      }
    })
  }

  public cancel(): void {
    this.router.navigate(['clientes']);
  }

}
