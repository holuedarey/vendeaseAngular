import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css']
})
export class BreadcrumbComponent implements OnInit {
  @Input() breadCrumb: any;
  // @Input() label:string;
  // @Input() url:string;
  constructor() { }

  ngOnInit(): void {
  }

}
