import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as Cesium from 'cesium';

@Component({
  selector: 'app-cesium-viewer',
  templateUrl: './cesium-viewer.component.html',
  styleUrls: ['./cesium-viewer.component.scss'],
})
export class CesiumViewerComponent implements OnInit, OnDestroy {
  viewer?: Cesium.Viewer;
  handler!: Cesium.ScreenSpaceEventHandler;

  dragType: 'cube' | 'sphere' | null = null;
  cubeNumber = 1;
  sphereNumber = 1;
  selectedEntity: Cesium.Entity | null = null;

  clickLat: number | null = null;
  clickLon: number | null = null;

  private dragEntity: Cesium.Entity | null = null;
  private isDragging = false;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    (window as any).CESIUM_BASE_URL = '/assets/cesium/';

    this.viewer = new Cesium.Viewer(
      this.el.nativeElement.querySelector('#cesiumContainer'),
      { terrain: Cesium.Terrain.fromWorldTerrain() }
    );

    // HOME button
    const myHome = Cesium.Cartesian3.fromDegrees(23.5669, 46.7622, 1000);
    const homeCameraView = {
      destination: myHome,
      orientation: { heading: 0, pitch: Cesium.Math.toRadians(-90), roll: 0 },
      duration: 1.5,
    };
    this.viewer.homeButton.viewModel.command.beforeExecute.addEventListener(
      (commandInfo) => {
        commandInfo.cancel = true;
        this.viewer?.camera.flyTo(homeCameraView);
      }
    );

    // DRAG&DROP from toolbox
    const canvas = this.viewer.scene.canvas;
    canvas.addEventListener('dragover', (e) => e.preventDefault());
    canvas.addEventListener('drop', (e) => {
      e.preventDefault();
      if (!this.dragType || !this.viewer) return;
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cartesian =
        this.viewer.scene.pickPosition(new Cesium.Cartesian2(x, y)) ||
        this.viewer.camera.pickEllipsoid(new Cesium.Cartesian2(x, y));
      if (!cartesian) return;

      this.viewer.entities.add({
        position: cartesian,
        ...(this.dragType === 'cube'
          ? {
              name: 'Cube ' + this.cubeNumber++,
              box: {
                dimensions: new Cesium.Cartesian3(10, 10, 10),
                material: Cesium.Color.RED,
              },
            }
          : {
              name: 'Sphere ' + this.sphereNumber++,
              ellipsoid: {
                radii: new Cesium.Cartesian3(5, 5, 5),
                material: Cesium.Color.GREEN,
              },
            }),
      });
      this.dragType = null;
    });

    // HANDLER for click & drag on map
    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);

    // Mouse down
    this.handler.setInputAction((click: any) => {
      const picked = this.viewer!.scene.pick(click.position);
      if (Cesium.defined(picked) && picked.id) {
        this.dragEntity = picked.id;
        this.isDragging = false; // inițial nu e drag
        // dezactivează camera doar dacă va fi drag
      } else {
        this.showClickPositionInfo(click.position);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

    // Mouse move
    this.handler.setInputAction((movement: any) => {
      if (!this.dragEntity) return;

      // Dacă mouse-ul s-a mișcat suficient, considerăm drag
      if (!this.isDragging) {
        this.isDragging = true;
        this.viewer!.scene.screenSpaceCameraController.enableRotate = false;
        this.viewer!.scene.screenSpaceCameraController.enableTranslate = false;
        this.viewer!.scene.screenSpaceCameraController.enableZoom = false;
      }

      const cartesian = this.viewer!.scene.pickPosition(movement.endPosition);
      if (cartesian) this.dragEntity.position = cartesian as any;
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    // Mouse up
    this.handler.setInputAction(() => {
      if (this.dragEntity && this.isDragging) {
        this.viewer!.scene.screenSpaceCameraController.enableRotate = true;
        this.viewer!.scene.screenSpaceCameraController.enableTranslate = true;
        this.viewer!.scene.screenSpaceCameraController.enableZoom = true;
      }
      this.dragEntity = null;
      this.isDragging = false;
    }, Cesium.ScreenSpaceEventType.LEFT_UP);

    // LEFT_CLICK (pentru afișare info)
    this.handler.setInputAction((click: any) => {
      if (this.isDragging) return; // ignorăm click dacă e drag
      const picked = this.viewer!.scene.pick(click.position);
      if (Cesium.defined(picked) && picked.id) {
        this.showEntityInfo(picked.id);
      } else {
        this.showClickPositionInfo(click.position);
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  startDrag(event: DragEvent, type: 'cube' | 'sphere') {
    this.dragType = type;
  }

  showEntityInfo(entity: Cesium.Entity) {
    this.selectedEntity = entity;
    const position = entity.position?.getValue
      ? entity.position.getValue(this.viewer!.clock.currentTime)
      : null;
    if (position) {
      const carto = Cesium.Cartographic.fromCartesian(position);
      this.clickLat = Cesium.Math.toDegrees(carto.latitude);
      this.clickLon = Cesium.Math.toDegrees(carto.longitude);
    } else {
      this.clickLat = null;
      this.clickLon = null;
    }
  }

  showClickPositionInfo(screenPosition: Cesium.Cartesian2) {
    this.selectedEntity = null;
    const cartesian = this.viewer!.camera.pickEllipsoid(screenPosition);
    if (cartesian) {
      const carto = Cesium.Cartographic.fromCartesian(cartesian);
      this.clickLat = Cesium.Math.toDegrees(carto.latitude);
      this.clickLon = Cesium.Math.toDegrees(carto.longitude);
    } else {
      this.clickLat = null;
      this.clickLon = null;
    }
  }

  ngOnDestroy(): void {
    this.viewer?.destroy();
  }
}
