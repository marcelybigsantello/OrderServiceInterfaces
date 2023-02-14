import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GrauInstrucao } from 'src/app/models/grau-instrucao';
import { Tecnico } from 'src/app/models/tecnico';
import { MessageService } from 'src/app/services/message.service';
import { TecnicosService } from 'src/app/services/tecnicos.service';

const messageExclusaoTecnicoSucesso = 'Técnico excluído com sucesso!';
const tecnicoComOrdensServicoCadastradas = 'possui Ordens de Serviço';

@Component({
  selector: 'app-tecnico-delete',
  templateUrl: './tecnico-delete.component.html',
  styleUrls: ['./tecnico-delete.component.css']
})
export class TecnicoDeleteComponent implements OnInit {

  tecnico: Tecnico = {
    id: '',
    nome: '',
    cpf: '',
    telefone: '',
    grauInstrucao: ''
  }

  id_tec = '';
  grausDeInstrucao: GrauInstrucao[] = [
    { code: 1, description: 'Ensino Médio' },
    { code: 2, description: 'Graduação' },
    { code: 3, description: 'Pós Graduação' },
    { code: 4, description: 'Mestrado' }
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

  public delete(): void {
    this.tecnicoService.delete(this.tecnico).subscribe((ret) => {
      this.router.navigate(['tecnicos']);
      this.messageService.generateMessage(messageExclusaoTecnicoSucesso);
    }, err => {
      if (err.error.error.match(tecnicoComOrdensServicoCadastradas)) {
        this.messageService.generateMessage(err.error.error);
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

  public setGrauInstrucao(description: String): void {
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
  }

}
