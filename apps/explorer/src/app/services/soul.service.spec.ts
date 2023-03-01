import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  ApolloTestingController,
  ApolloTestingModule,
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
        status: 0,
        owner: '0x96ffa04a300294f810f754e0b95431c2821d3d50',
        createdAt: 1665497178,
        updatedAt: 1665497178,
        metadata: {
          name: 'Sovereign Nature Identifier #N',
          image:
            'ipfs://QmdGf3N4tFQAWwTeETrW2m5LUGJgkDXWfA1cUBWrv6ozNM/3/Image52.jpg',
          attributes: [
            { trait_type: 'Left ear', value: 'left_ear.jpg' },
            { trait_type: 'Right ear', value: 'right_ear.jpg' },
          ],
          description: '...',
          properties: {
            geometry: '-',
            taxonId: 'itis:183803',
            statusDescription: '-',
            conservationStatus: '-',
          },
        },
        collectionName: '',
        statusDescription: '',
        tokenId: 2,
        tokenURI:
          'ipfs://bafyreib564aosdw5igyfbvedtdvtz4xgrznz64iszd34b32cfvzro3rm5y/metadata.json',
        computeURI:
          'https://docs.google.com/document/d/1a9SJnL3uQlZP8R9yKv-qN4BYYfDQZakagx-O3sNw3Tg',
        dataURI:
          'https://www.marapredatorconservation.org/wp-content/uploads/2020/09/Muskuteers-Marsh.pdf',
      },
    },
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ApolloTestingModule, HttpClientTestingModule],
    });
    soulService = TestBed.inject(SoulService);
    apolloController = TestBed.inject(ApolloTestingController);
  });

  it('should be created', () => {
    expect(soulService).toBeTruthy();
  });

  it('should display souls list', () => {
    soulService.getSoulsList('').subscribe((souls) => {
      expect(souls).toBeTruthy('No souls returned');

      expect(souls.length).toBe(3, 'Incorrect number of courses');

      const soul = souls.find((soul: Soul) => soul.id === '0x2');

      expect(soul?.id).toBe('0x2');
      expect(soul?.status).toBe(0);
      expect(soul?.createdAt).toBe(1665497178);
      expect(soul?.updatedAt).toBe(1665497178);
      expect(soul?.metadata?.name).toBe('Sovereign Nature Identifier #N');
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
            metadata: {
              name: 'Sovereign Nature Identifier #N',
              image:
                'ipfs://QmdGf3N4tFQAWwTeETrW2m5LUGJgkDXWfA1cUBWrv6ozNM/3/Image52.jpg',
              attributes: [
                { trait_type: 'Left ear', value: 'left_ear.jpg' },
                { trait_type: 'Right ear', value: 'right_ear.jpg' },
              ],
              description: '...',
              properties: {
                geometry: '-',
                taxonId: 'itis:183803',
                statusDescription: '-',
                conservationStatus: '-',
              },
            },
            collectionName: '',
          },
          {
            id: '0x1',
            status: 0,
            owner: '0x96ffa04a300294f810f754e0b95431c2821d3d50',
            createdAt: 1665496818,
            updatedAt: 1665496818,
            metadata: {
              name: 'Sovereign Nature Identifier #N',
              image:
                'ipfs://QmdGf3N4tFQAWwTeETrW2m5LUGJgkDXWfA1cUBWrv6ozNM/3/Image52.jpg',
              attributes: [
                { trait_type: 'Left ear', value: 'left_ear.jpg' },
                { trait_type: 'Right ear', value: 'right_ear.jpg' },
              ],
              description: '...',
              properties: {
                geometry: '-',
                taxonId: 'itis:183803',
                statusDescription: '-',
                conservationStatus: '-',
              },
            },
            collectionName: '',
          },
          {
            id: '0x2',
            status: 0,
            owner: '0x96ffa04a300294f810f754e0b95431c2821d3d50',
            createdAt: 1665497178,
            updatedAt: 1665497178,
            metadata: {
              name: 'Sovereign Nature Identifier #N',
              image:
                'ipfs://QmdGf3N4tFQAWwTeETrW2m5LUGJgkDXWfA1cUBWrv6ozNM/3/Image52.jpg',
              attributes: [
                { trait_type: 'Left ear', value: 'left_ear.jpg' },
                { trait_type: 'Right ear', value: 'right_ear.jpg' },
              ],
              description: '...',
              properties: {
                geometry: '-',
                taxonId: 'itis:183803',
                statusDescription: '-',
                conservationStatus: '-',
              },
            },
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
      expect(soul?.createdAt).toBe(1665497178);
      expect(soul?.updatedAt).toBe(1665497178);
      expect(soul?.metadata?.name).toBe('Sovereign Nature Identifier #N');
      expect(soul?.collectionName).toBe('');
    });

    const op = apolloController.expectOne(SOUL_DETAIL);
    expect(op.operation.operationName).toEqual('sniDetail');

    op.flush(soul);
  });

  it('should display soul properties', () => {
    soulService.getSoulDataById('0x2', SOUL_PROPERTY).subscribe((soul) => {
      expect(soul).toBeTruthy('No soul properties returned');

      expect(soul?.metadata?.description).toBe('...');
      expect(soul?.metadata?.image).toBe(
        'ipfs://QmdGf3N4tFQAWwTeETrW2m5LUGJgkDXWfA1cUBWrv6ozNM/3/Image52.jpg'
      );
      expect(soul?.metadata?.properties.statusDescription).toBe('-');
      expect(soul?.metadata?.properties.taxonId).toBe('itis:183803');
      expect(soul?.tokenId).toBe(2);
    });

    const op = apolloController.expectOne(SOUL_PROPERTY);
    expect(op.operation.operationName).toEqual('sniDetail');

    op.flush(soul);
  });

  afterEach(() => {
    apolloController.verify();
  });
});
