import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Soul } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';

@Component({
  selector: 'sni-soul-list',
  templateUrl: './soul-list.component.html',
  styleUrls: ['./soul-list.component.scss'],
})
export class SoulListComponent implements OnInit {
  souls$!: Observable<Soul[]>;

  constructor(private soulService: SoulService) {}

  ngOnInit() {
    this.souls$ = this.soulService.getSoulsList();
  }
}
