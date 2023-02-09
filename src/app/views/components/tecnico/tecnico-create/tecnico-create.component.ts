import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GrauInstrucao } from 'src/app/models/grau-instrucao';
import { Tecnico } from 'src/app/models/tecnico';
import { MessageService } from 'src/app/services/message.service';
import { TecnicosService } from 'src/app/services/tecnicos.service';

@Component({
  selector: 'app-tecnico-create',
  templateUrl: './tecnico-create.component.html',
  styleUrls: ['./tecnico-create.component.css']
})
export class TecnicoCreateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '', 
    telefone: '',
    grauInstrucao: ''
  }

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);
  grauInstrucao = new FormControl<GrauInstrucao | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  grausDeInstrucao: GrauInstrucao[] = [
    {code: 1, description: 'Ensino Médio'},
    {code: 2, description: 'Graduação'},
    {code: 3, description: 'Pós Graduação'},
    {code: 4, description: 'Mestrado'},
    {code: 5, description: 'Doutorado'},
  ];

  constructor(
    private router : Router,
    private tecnicoService: TecnicosService,
    private messageService: MessageService) { }

  ngOnInit(): void {
  }

  public cancel(): void {
    this.router.navigate(['tecnicos']);
  }

  public create(): void {
    this.tecnicoService.create(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos']),
      this.messageService.generateMessage('Técnico cadastrado com sucesso!')
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

  public errorValidGrauInstrucao(): String | boolean {
    if (this.grauInstrucao === null || this.grauInstrucao === undefined){
      return 'Grau de Instrução não informado!';
    }

    return false;
  }
 
}
