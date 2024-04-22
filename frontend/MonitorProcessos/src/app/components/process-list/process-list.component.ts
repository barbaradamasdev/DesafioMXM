import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ProcessInfoData } from '../../models/ProcessInfoData';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-process-list',
  standalone: true,
  imports: [CommonModule, MatSortModule],
  templateUrl: './process-list.component.html',
  styleUrl: './process-list.component.css'
})
export class ProcessListComponent implements OnInit, AfterViewInit {

  @Input() processos: ProcessInfoData['processos'] | null = null;
  @ViewChild(MatSort) sort!: MatSort;
  dataSource = new MatTableDataSource<any>();

  constructor() {}

  ngOnInit() {
    if (this.processos) {
      this.dataSource.data = this.processos;
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  sortData(sortField: string) {
    const data = this.dataSource.data.slice();
    const sortDirection = this.sort.active === sortField ? this.sort.direction : 'asc';

    if (!sortDirection) {
      return;
    }

    data.sort((a, b) => {
      const isAsc = sortDirection === 'asc';
      switch (sortField) {
        case 'nome':
          return compare(a.nome, b.nome, isAsc);
        case 'id':
          return compare(a.id, b.id, isAsc);
        case 'memoriaPagedKB':
          return compare(a.memoriaPagedKB, b.memoriaPagedKB, isAsc);
        default:
          return 0;
      }
    });

    this.dataSource.data = data;
  }

}

function compare(a: any, b: any, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
