import { Component, model } from '@angular/core';

export type ViewMode = 'task' | 'user';

@Component({
  selector: 'app-view-toggle',
  templateUrl: './view-toggle.html',
})
export class ViewToggle {
  view = model<ViewMode>('task');
}