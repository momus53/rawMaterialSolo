import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StockRawMaterialComponent } from './components/stock-raw-material/stock-raw-material.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { StockResourceComponent } from './components/stock-resource-list/stock-resource-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet, StockRawMaterialComponent, StockResourceComponent,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'rawMaterialSolo';
}


