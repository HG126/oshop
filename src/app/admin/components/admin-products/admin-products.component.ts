import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from 'shared/services/product.service';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'app/shared/Models/product';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products : Product[];
  filteredProducts : Product[];
  subscription : Subscription;

  dataSource: MatTableDataSource<Product>;
  pageSizeOptions: number[] = [3, 5, 10, 25, 100];
  displayedColumns : string[] = ['title', 'price', 'edit'];
  length: number;
  pageSize: number = 10;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  
  /**constructor(private productService : ProductService) { 
    this.subscription = this.productService.getAll().subscribe((products) =>{
      this.filteredProducts = this.products = products;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.length = this.products.length;
    });

  }**/
  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe((products) => {
      this.filteredProducts = this.products = products.map((product) => {
        return <Product>{
          key : product['key'],
          title: product['title'],
          category: product['category'],
          price: product['price'],
          imageUrl: product['imageUrl'],
         };
      });
 
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.length = this.products.length;
    });
  }


  ngOnInit(): void {
  }
  filter(query : string)
  {
    this.dataSource.filter = query.trim().toLowerCase();
  }

  ngOnDestroy()
  {
    this.subscription.unsubscribe();
  }

}
