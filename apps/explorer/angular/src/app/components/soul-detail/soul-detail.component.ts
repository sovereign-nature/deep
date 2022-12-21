import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Soul } from 'src/app/models/soul';
import { SoulService } from 'src/app/services/soul.service';

@Component({
  selector: 'sni-soul-detail',
  templateUrl: './soul-detail.component.html',
  styleUrls: ['./soul-detail.component.scss'],
})
export class SoulDetailComponent implements OnInit {
  detail$!: Observable<Partial<Soul>>;

  constructor(
    private route: ActivatedRoute,
    private soulService: SoulService
  ) {}

  ngOnInit() {
    const soulId = this.route.snapshot.paramMap.get('soulId');
    this.detail$ = this.soulService.getSoulDetailsById(soulId!);
  }
}
