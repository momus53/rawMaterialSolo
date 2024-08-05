import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { StockRawMaterialService, stockrawmaterial } from '../../services/stockrawmaterial.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../new-stock-raw-material/new-stock-raw-material.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-stock-raw-material',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatPaginatorModule,MatSortModule,MatInputModule,MatButtonModule],
  templateUrl: './stock-raw-material.component.html',
  styleUrls: ['./stock-raw-material.component.css'],
})
export class StockRawMaterialComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'enteredAt', 'createdAt', 'group', 'producingFamily', 'canFreeze', 'prepared', 'expiredAt','action'];
  dataSource: MatTableDataSource<stockrawmaterial> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private stockrawmaterialService: StockRawMaterialService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.stockrawmaterialService.getRawMaterial().subscribe((data: stockrawmaterial[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadRawMaterials(): void {
    this.stockrawmaterialService.getRawMaterial().subscribe((data: stockrawmaterial[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openModal(product: stockrawmaterial | null = null): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadRawMaterials();
      }
    });
  }

  delete(element: stockrawmaterial): void {

    if (confirm('Are you sure you want to delete this recipe?')) {
      this.stockrawmaterialService.deleteRawMaterial(element.id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== element.id);
      }, error => {
        console.error('Error deleting product:', error);
      });
    }
  } 

  edit(element: stockrawmaterial): void {
    this.openModal(element);
  }
}



