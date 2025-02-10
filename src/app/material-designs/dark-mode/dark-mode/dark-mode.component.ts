import { Component, OnInit,Renderer2  } from '@angular/core';

@Component({
  selector: 'b2b-dark-mode',
  templateUrl: './dark-mode.component.html',
  styleUrls: ['./dark-mode.component.css']
})
export class DarkModeComponent implements OnInit {

  constructor(private renderer: Renderer2) {}

  isDarkMode = false;

  toggle() {
    this.isDarkMode = !this.isDarkMode;

    if (this.isDarkMode) {
      this.renderer.addClass(document.body, 'dark');
    } else {
      this.renderer.removeClass(document.body, 'dark');
    }
  }

  ngOnInit(): void {
  }

}
