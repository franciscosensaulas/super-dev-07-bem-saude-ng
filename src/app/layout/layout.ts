import { Component } from '@angular/core';
import { Sidebar } from "../core/components/sidebar/sidebar";
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-layout',
  imports: [Sidebar, RouterOutlet],
  templateUrl: './layout.html'
})
export class Layout {

}
