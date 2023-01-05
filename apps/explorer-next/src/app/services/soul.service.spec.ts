import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingModule,
  ApolloTestingController,
} from 'apollo-angular/testing';
import { Soul } from '../models/soul';
import { SOULS_LIST, SOUL_DETAIL, SOUL_PROPERTY } from '../queries/sni';

import { SoulService } from './soul.service';

describe('SoulService', () => {
  let apolloController: ApolloTestingController;
  let soulService: SoulService;
  const soul = {
    data: {
      sni: {
        id: '0x2',
        owner: '0x96ffa04a300294f810f754e0b95431c2821d3d50',
        status: 0,
        createdAt: 1665497178,
        updatedAt: 1665497178,
        name: 'Sovereign Nature Identifier #N',
        collectionName: '',
        oracle: '',
        symbol: '',
        description: 'Test lion identifier',
        image:
          'ipfs://bafybeihs6qouvmo4pnjozlrdmgic3b4nav6rrswc3tobgclrrvtwsa47oe/blob',
        statusDescription: '',
        taxonId: 'itis:183803',
        tokenId: 2,
        tokenURI:
          'ipfs://bafyreib564aosdw5igyfbvedtdvtz4xgrznz64iszd34b32cfvzro3rm5y/metadata.json',
        geometry: 'POINT(5.9559 47.8084)',
        conservationStatus: 'VU',
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule],
    });
    soulService = TestBed.inject(SoulService);
    apolloController = TestBed.inject(ApolloTestingController);
  });

  it('should be created', () => {
    expect(soulService).toBeTruthy();
  });

  it('should display souls list', () => {
    soulService.getSoulsList().subscribe((souls) => {
      expect(souls).toBeTruthy('No souls returned');

      expect(souls.length).toBe(3, 'Incorrect number of courses');

      const soul = souls.find((soul: Soul) => soul.id === '0x2');

      expect(soul?.id).toBe('0x2');
      expect(soul?.status).toBe(0);
      expect(soul?.owner).toBe('0x96ffa04a300294f810f754e0b95431c2821d3d50');
      expect(soul?.createdAt).toBe(1665497178);
      expect(soul?.updatedAt).toBe(1665497178);
      expect(soul?.name).toBe('Sovereign Nature Identifier #N');
      expect(soul?.collectionName).toBe('');
    });

    const op = apolloController.expectOne(SOULS_LIST);
    expect(op.operation.operationName).toEqual('sniList');

    op.flush({
      data: {
        snis: [
          {
            id: '0x0',
            owner: '0x96ffa04a300294f810f754e0b95431c2821d3d50',
            status: 1,
            createdAt: 1661520378,
            updatedAt: 1665496530,
            name: '',
            collectionName: '',
          },
          {
            id: '0x1',
            owner: '0x96ffa04a300294f810f754e0b95431c2821d3d50',
            status: 0,
            createdAt: 1665496818,
            updatedAt: 1665496818,
            name: '',
            collectionName: '',
          },
          {
            id: '0x2',
            owner: '0x96ffa04a300294f810f754e0b95431c2821d3d50',
            status: 0,
            createdAt: 1665497178,
            updatedAt: 1665497178,
            name: 'Sovereign Nature Identifier #N',
            collectionName: '',
          },
        ],
      },
    });
  });

  it('should display soul details', () => {
    soulService.getSoulDataById('0x2', SOUL_DETAIL).subscribe((soul) => {
      expect(soul).toBeTruthy('No soul details returned');

      expect(soul?.id).toBe('0x2');
      expect(soul?.status).toBe(0);
      expect(soul?.owner).toBe('0x96ffa04a300294f810f754e0b95431c2821d3d50');
      expect(soul?.createdAt).toBe(1665497178);
      expect(soul?.updatedAt).toBe(1665497178);
      expect(soul?.name).toBe('Sovereign Nature Identifier #N');
      expect(soul?.collectionName).toBe('');
    });

    const op = apolloController.expectOne(SOUL_DETAIL);
    expect(op.operation.operationName).toEqual('sniDetail');

    op.flush(soul);
  });

  it('should display soul properties', () => {
    soulService.getSoulDataById('0x2', SOUL_PROPERTY).subscribe((soul) => {
      expect(soul).toBeTruthy('No soul properties returned');

      expect(soul?.oracle).toBe('');
      expect(soul?.symbol).toBe('');
      expect(soul?.description).toBe('Test lion identifier');
      expect(soul?.image).toBe(
        'ipfs://bafybeihs6qouvmo4pnjozlrdmgic3b4nav6rrswc3tobgclrrvtwsa47oe/blob'
      );
      expect(soul?.statusDescription).toBe('');
      expect(soul?.taxonId).toBe('itis:183803');
      expect(soul?.tokenId).toBe(2);
      expect(soul?.tokenURI).toBe(
        'ipfs://bafyreib564aosdw5igyfbvedtdvtz4xgrznz64iszd34b32cfvzro3rm5y/metadata.json'
      );
      expect(soul?.geometry).toBe('POINT(5.9559 47.8084)');
      expect(soul?.conservationStatus).toBe('VU');
    });

    const op = apolloController.expectOne(SOUL_PROPERTY);
    expect(op.operation.operationName).toEqual('sniDetail');

    op.flush(soul);
  });

  afterEach(() => {
    apolloController.verify();
  });
});
