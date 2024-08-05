import { Component , Inject} from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { StockRawMaterialService , stockrawmaterial} from '../../services/stockrawmaterial.service';

@Component({
  selector: 'app-new-stock-raw-material',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,MatSelectModule],
  templateUrl: './new-stock-raw-material.component.html',
  styleUrls: ['./new-stock-raw-material.component.css']
})
export class AddProductDialogComponent {
  productForm: FormGroup;
  isEdit: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddProductDialogComponent>,
    private stockRawMaterialService: StockRawMaterialService,
    @Inject(MAT_DIALOG_DATA) public data: stockrawmaterial | null
  ) {
    this.isEdit = !!data;
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      quantity: this.fb.group({
        value: ['', Validators.required],
        unit: ['', Validators.required]
      }),
      enteredAt: ['', Validators.required],
      createdAt: ['', Validators.required],
      group: this.fb.group({
        id: ['', Validators.required],
      //  name: ['', Validators.required]
      }),
      producingFamily: this.fb.group({
        id: ['', Validators.required],
      //  name: ['', Validators.required],
      //  location: ['', Validators.required]
      }),
      canFreeze: ['', Validators.required],
      prepared: ['', Validators.required],
      expiredAt: ['', Validators.required]
    });

    if (this.isEdit && data) {const formattedData = {
      ...data,
      enteredAt: this.formatDate(data.enteredAt),
      createdAt: this.formatDate(data.createdAt),
      expiredAt: this.formatDate(data.expiredAt)
    };
    this.productForm.patchValue(formattedData);
    }
  }

  formatDate(timestamp: string | number): string {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  save() {
    if (this.productForm.valid) {
      const product = { ...this.productForm.value, id: this.data?.id ?? this.productForm.get('id')?.value };
      if (this.isEdit) {
        this.stockRawMaterialService.updateRawMaterial(product).subscribe({
          next: (result) => this.dialogRef.close(result),
          error: (error) => console.error('Error updating product:', error)
        });
      } else {
        this.stockRawMaterialService.addRawMaterial(product).subscribe({
          next: (result) => this.dialogRef.close(result),
          error: (error) => console.error('Error adding product:', error)
        });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
