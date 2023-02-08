import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/clientes.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-cliente-create',
  templateUrl: './cliente-create.component.html',
  styleUrls: ['./cliente-create.component.css']
})
export class ClienteCreateComponent implements OnInit {

  cliente: Cliente = {
    id: '',
    nome: '',
    cpf: '', 
    telefone: ''
  }

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);
  selectFormControl = new FormControl('', Validators.required);

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  public cancel(): void {
    this.router.navigate(['clientes']);
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe((resposta) => {
      this.router.navigate(['clientes']),
      this.messageService.generateMessage('Cliente cadastrado com sucesso!')
    }, err => {
      if (err.error.error.match('já cadastrado')) {
        this.messageService.generateMessage(err.error.error);
      }
      else if (err.error.errors[0].message === "número do registro de contribuinte individual " 
      + "brasileiro (CPF) inválido"){
        this.messageService.generateMessage("CPF inválido");
      }
    })
  }

  public errorValidName(): String | boolean {
    if (this.nome.invalid){
      return 'O nome precisa ter entre 5 e 100 caracteres';
    }
    return false;
  }

  public errorValidCPF(): String | boolean {
    if (this.cpf.invalid){
      return 'O CPF precisa ter 11 caracteres';
    }
    return false;
  }

  public errorValidTelefone(): String | boolean {
    if (this.telefone.invalid){
      return 'O telefone deve ter entre 11 e 15 caracteres';
    }

    return false;
  }

}
