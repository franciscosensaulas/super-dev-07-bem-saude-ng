import { Component, inject, model } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { RegistroStatusTag } from '../../../core/components/registro-status-tag/registro-status-tag';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoFocus } from 'primeng/autofocus';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ProfissionalCriarRequestModel, ProfissionalEditarRequestModel, ProfissionalResponseModel } from '../../../models/profissional.model';
import { InputMaskModule } from 'primeng/inputmask';
import { FluidModule } from 'primeng/fluid';
import { ProfissionalService } from '../../../services/profissional.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-profissionais-list',
  imports: [ButtonModule, SelectModule, TableModule, RegistroStatusTag, FormsModule, AutoFocus, DialogModule, InputTextModule,
    InputMaskModule, FluidModule, ReactiveFormsModule, CheckboxModule
  ],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class List {
  private readonly formBuilder = inject(FormBuilder);
  private readonly profissionalService = inject(ProfissionalService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);

  idEditar: string | undefined = undefined;
  filtros = ["Todos", "Ativos", "Inativos"];
  filtroSelecionado: string = "Todos";
  pesquisa: string = "";
  visible: boolean = false;

  especialidades = [
    { label: 'Clínico Geral', value: 'Clínico Geral' },
    { label: 'Cardiologia', value: 'Cardiologia' },
    { label: 'Ortopedia', value: 'Ortopedia' },
    { label: 'Dermatologia', value: 'Dermatologia' },
    { label: 'Pediatria', value: 'Pediatria' },
  ];

  diasSemana = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
  diasSemanaLabels: { [key: string]: string } = {
    'SEG': 'Seg',
    'TER': 'Ter',
    'QUA': 'Qua',
    'QUI': 'Qui',
    'SEX': 'Sex',
    'SAB': 'Sáb',
  };

  profissionalForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
    especialidade: ['', [Validators.required]],
    registro: ['', [Validators.required, Validators.maxLength(20)]],
    duracao: ['', [Validators.required, Validators.maxLength(10)]],
    valor: [''],
    diasSelecionados: [[] as string[]],
  });

  profissionais = model<ProfissionalResponseModel[]>([]);

  constructor() {
    this.carregarProfissionais();
  }

  carregarProfissionais() {
    this.profissionalService.getAll().subscribe({
      next: (profissionais: ProfissionalResponseModel[]) => {
        this.profissionais.set(profissionais);
      },
      error: (erro: Error) => {
        console.log(`Erro ao carregar profissionais ${erro}`);
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: "Ocorreu um erro ao carregar os profissionais"
        });
      }
    });
  }

  showDialog(): void {
    this.idEditar = undefined;
    this.profissionalForm.reset();
    this.profissionalForm.patchValue({ diasSelecionados: [] });
    this.profissionalForm.get('registro')?.enable();
    this.visible = true;
  }

  cancelar() {
    this.visible = false;
    this.profissionalForm.reset();
    this.idEditar = undefined;
  }

  salvar() {
    const diasStr = (this.profissionalForm.getRawValue().diasSelecionados || []).join(',');

    if (this.idEditar === undefined) {
      const form: ProfissionalCriarRequestModel = {
        nome: this.profissionalForm.getRawValue().nome!,
        especialidade: this.profissionalForm.getRawValue().especialidade!,
        registro: this.profissionalForm.getRawValue().registro!,
        duracao: this.profissionalForm.getRawValue().duracao!,
        valor: this.profissionalForm.getRawValue().valor || '',
        dias_semana: diasStr,
      };
      this.cadastrar(form);
    } else {
      const form: ProfissionalEditarRequestModel = {
        nome: this.profissionalForm.getRawValue().nome!,
        especialidade: this.profissionalForm.getRawValue().especialidade!,
        duracao: this.profissionalForm.getRawValue().duracao!,
        valor: this.profissionalForm.getRawValue().valor || '',
        dias_semana: diasStr,
      };
      this.editar(form);
    }
  }

  cadastrar(form: ProfissionalCriarRequestModel) {
    this.profissionalService.create(form).subscribe({
      next: () => {
        this.visible = false;
        this.profissionalForm.reset();
        this.messageService.add({
          severity: "success",
          summary: "Show de bola!",
          detail: "Profissional cadastrado com sucesso"
        });
        this.carregarProfissionais();
      },
      error: (erro: Error) => {
        console.log(`Ocorreu um erro ao tentar cadastrar profissional: ${erro}`);
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: "Ocorreu um erro ao cadastrar profissional"
        });
      }
    });
  }

  editar(form: ProfissionalEditarRequestModel) {
    this.profissionalService.update(this.idEditar!, form).subscribe({
      next: () => {
        this.visible = false;
        this.profissionalForm.reset();
        this.idEditar = undefined;
        this.messageService.add({
          severity: "success",
          summary: "Show de bola!",
          detail: "Profissional alterado com sucesso"
        });
        this.carregarProfissionais();
      },
      error: (erro: Error) => {
        console.log(`Ocorreu um erro ao tentar alterar profissional: ${erro}`);
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: "Ocorreu um erro ao alterar profissional"
        });
      }
    });
  }

  abrirModalEditar(profissional: ProfissionalResponseModel) {
    this.idEditar = profissional.id;
    this.profissionalService.getById(profissional.id).subscribe({
      next: (dados) => {
        const diasArray = dados.dias_semana ? dados.dias_semana.split(',').filter(d => d.trim() !== '') : [];
        this.profissionalForm.patchValue({
          nome: dados.nome,
          especialidade: dados.especialidade,
          registro: dados.registro,
          duracao: dados.duracao,
          valor: dados.valor,
          diasSelecionados: diasArray,
        });
        this.profissionalForm.get('registro')?.disable();
        this.visible = true;
      },
      error: (erro: Error) => {
        console.log(`Erro ao buscar profissional: ${erro}`);
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: "Ocorreu um erro ao buscar dados do profissional"
        });
      }
    });
  }

  confirmarAtivacao(profissional: ProfissionalResponseModel) {
    this.confirmationService.confirm({
      message: `Deseja ativar o profissional '${profissional.nome}'?`,
      header: 'Cuidado',
      icon: 'fa fa-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Ativar',
        severity: 'success'
      },
      accept: () => {
        this.ativar(profissional);
      }
    });
  }

  confirmarInativar(profissional: ProfissionalResponseModel) {
    this.confirmationService.confirm({
      message: `Deseja inativar o profissional '${profissional.nome}'?`,
      header: 'Cuidado',
      icon: 'fa fa-info-circle',
      rejectLabel: 'Cancelar',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Inativar',
        severity: 'danger'
      },
      accept: () => {
        this.inativar(profissional);
      }
    });
  }

  ativar(profissional: ProfissionalResponseModel) {
    this.profissionalService.ativar(profissional.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: "success",
          summary: "Show de bola!",
          detail: "Profissional ativado com sucesso"
        });
        this.carregarProfissionais();
      },
      error: (erro: Error) => {
        console.log(`Ocorreu um erro ao tentar ativar profissional: ${erro}`);
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: "Ocorreu um erro ao ativar profissional"
        });
      }
    });
  }

  inativar(profissional: ProfissionalResponseModel) {
    this.profissionalService.inativar(profissional.id).subscribe({
      next: () => {
        this.messageService.add({
          severity: "success",
          summary: "Show de bola!",
          detail: "Profissional inativado com sucesso"
        });
        this.carregarProfissionais();
      },
      error: (erro: Error) => {
        console.log(`Ocorreu um erro ao tentar inativar profissional: ${erro}`);
        this.messageService.add({
          severity: "error",
          summary: "Erro",
          detail: "Ocorreu um erro ao inativar profissional"
        });
      }
    });
  }
}
