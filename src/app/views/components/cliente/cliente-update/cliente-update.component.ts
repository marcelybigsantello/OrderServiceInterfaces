import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/clientes.service';
import { MessageService } from 'src/app/services/message.service';

const errorMessageCPF = 'número do registro de contribuinte individual brasileiro (CPF) inválido';
const messageInvalidCPF = 'CPF inválido';

@Component({
  selector: 'app-cliente-update',
  templateUrl: './cliente-update.component.html',
  styleUrls: ['./cliente-update.component.css']
})
export class ClienteUpdateComponent implements OnInit {

  id_cliente = '';

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '',
    telefone: ''
  };

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);

  constructor(private router: Router,
    private clienteService: ClienteService,
    private messageService: MessageService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id_cliente = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  public cancel(): void {
    this.router.navigate(['clientes']);
  }

  public findById(): void {
    this.clienteService.findById(this.id_cliente).subscribe(resposta => {
      this.cliente = resposta;
    })
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes'])
      this.messageService.generateMessage('Cliente atualizado com sucesso');
    }, err => {
      console.log(err);
      if (err.error.error.match('já cadastrado')){
        this.messageService.generateMessage(err.error.error);
      } else if (err.error.errors[0].message === errorMessageCPF){
        this.messageService.generateMessage(messageInvalidCPF);
      }
    })
  }

  public errorValidName(): String | boolean {
    if (this.nome.invalid) {
      return 'O nome precisa ter entre 5 a 100 caracteres';
    }
    return false;
  }

  public errorValidCPF(): String | boolean {
    if (this.cpf.invalid) {
      return 'O CPF precisa ter 11 caracteres';
    }
    return false;
  }

  public errorValidTelefone(): String | boolean {
    if (this.telefone.invalid) {
      return 'O telefone precisa ter entre 11 a 15 algarismos';
    }
    return false;
  }

}
