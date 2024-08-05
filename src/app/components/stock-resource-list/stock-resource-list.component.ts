import { Component, OnInit ,ViewChild} from '@angular/core';
import { StockResourceService, stockresource } from '../../services/stock-resources.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddProductDialogComponent } from '../new-stock-raw-material/new-stock-raw-material.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-stock-resource-list',
  standalone: true,
  imports: [CommonModule,MatTableModule,MatPaginatorModule,MatSortModule,MatInputModule,MatButtonModule],
  templateUrl: './stock-resource-list.component.html',
  styleUrls: ['./stock-resource-list.component.css']
})
export class StockResourceComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'quantity', 'enteredAt', 'createdAt', 'group', 'producingFamily', 'action'];
  dataSource: MatTableDataSource<stockresource> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private stockresourceService: StockResourceService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.stockresourceService.getStockResource().subscribe((data: stockresource[]) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  loadStockResources(): void {
    this.stockresourceService.getStockResource().subscribe((data: stockresource[]) => {
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

  openModal(product: stockresource | null = null): void {
    const dialogRef = this.dialog.open(AddProductDialogComponent, {
      data: product
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadStockResources();
      }
    });
  }

  delete(element: stockresource): void {

    if (confirm('Are you sure you want to delete this recipe?')) {
      this.stockresourceService.deleteStockResource(element.id).subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== element.id);
      }, error => {
        console.error('Error deleting product:', error);
      });
    }
  } 

  edit(element: stockresource): void {
    this.openModal(element);
  }
}
