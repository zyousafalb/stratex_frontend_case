import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class UserModalComponent implements OnInit, OnDestroy {

  @Input() id: string = "user-modal";
  private element: any;


  constructor( private el: ElementRef, private usersService: UsersService) { 
    this.element = el.nativeElement;
  }

  ngOnInit(): void {

     // ensure id attribute exists
     if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
        if (el.target.className === 'user-modal') {
            this.close();
        }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.usersService.add(this);
    
    }

       // remove self from modal service when component is destroyed
       ngOnDestroy(): void {
        this.usersService.remove(this.id);
        this.element.remove();
    }

    // open modal
    open(): void {
        this.element.style.display = 'block';
        document.body.classList.add('user-modal-open');
        
    }

    // close modal
    close(): void {
        this.element.style.display = 'none';
        document.body.classList.remove('user-modal-open');
    }
}
