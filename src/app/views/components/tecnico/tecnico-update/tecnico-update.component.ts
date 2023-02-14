import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GrauInstrucao } from 'src/app/models/grau-instrucao';
import { Tecnico } from 'src/app/models/tecnico';
import { MessageService } from 'src/app/services/message.service';
import { TecnicosService } from 'src/app/services/tecnicos.service';

const errorMessageCPF = 'número do registro de contribuinte individual brasileiro (CPF) inválido';
const messageInvalidCPF = 'CPF inválido!';

@Component({
  selector: 'app-tecnico-update',
  templateUrl: './tecnico-update.component.html',
  styleUrls: ['./tecnico-update.component.css']
})
export class TecnicoUpdateComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
    grauInstrucao: ''
  }

  id_tec = '';

  nome = new FormControl('', [Validators.minLength(5)]);
  cpf = new FormControl('', [Validators.minLength(11)]);
  telefone = new FormControl('', [Validators.minLength(11)]);
  grauInstrucao = new FormControl<GrauInstrucao | null>(null, Validators.required);
  selectFormControl = new FormControl('', Validators.required);
  grausDeInstrucao: GrauInstrucao[] = [
    { code: 1, description: 'Ensino Médio' },
    { code: 2, description: 'Graduação' },
    { code: 3, description: 'Pós Graduação' },
    { code: 4, description: 'Mestrado' },
    { code: 5, description: 'Não informar' }
  ]

  constructor(private tecnicoService: TecnicosService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.id_tec = this.route.snapshot.paramMap.get('id')!;
    this.findById();
  }

  public update(): void {
    this.tecnicoService.update(this.tecnico).subscribe((resposta) => {
      this.router.navigate(['tecnicos']);
      this.messageService.generateMessage('Técnico atualizado com sucesso!');
    }, err => {
      if (err.error.error.match('já cadastrado')) {
        this.messageService.generateMessage(err.error.error);
      } else if (err.error.errors[0].message === errorMessageCPF) {
        this.messageService.generateMessage(messageInvalidCPF);
      }
    })
  }

  public findById(): void {
    this.tecnicoService.findById(this.id_tec).subscribe(resposta => {
      this.tecnico = resposta;
    })
  }

  public cancel(): void {
    this.router.navigate(['tecnicos']);
  }

  public errorValidName(): String | boolean {
    if (this.nome.invalid) {
      return 'O nome precisa ter entre 5 e 100 caracteres';
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
      return 'O telefone deve ter entre 11 e 15 caracteres';
    }

    return false;
  }

  public setGrauInstrucao(description: String): void {
    console.log(description)
    if (description === "Ensino Médio"){
      this.tecnico.grauInstrucao = "Ensino Médio";
    }

    if (description === "Graduação") {
      this.tecnico.grauInstrucao = "Graduação";
    }

    if (description === "Pós Graduação") {
      this.tecnico.grauInstrucao = "Pós Graduação";
    }

    if (description === "Mestrado"){
      this.tecnico.grauInstrucao = "Mestrado";
    }
    
    if (description === 'Não informar') {
      this.tecnico.grauInstrucao = "Não informar";
    }

  }

}
