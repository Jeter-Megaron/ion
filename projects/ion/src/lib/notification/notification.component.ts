import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { StatusType } from '../core/types';
import { IconType } from '../icon/icon.component';

export interface NotificationProps {
  title: string;
  message: string;
  type?: StatusType;
  icon?: IconType;
  fixed?: boolean;
}

@Component({
  selector: 'ion-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  @Input() title!: NotificationProps['title'];
  @Input() message!: NotificationProps['message'];
  @Input() icon?: NotificationProps['icon'];
  @Input() type?: NotificationProps['type'] = 'success';
  @Input() fixed?: NotificationProps['fixed'] = false;
  @ViewChild('notificationRef', { static: false }) notification: ElementRef;

  private timer: ReturnType<typeof setTimeout>;

  public getIcon(): IconType {
    const icons = {
      success: 'check-solid',
      info: 'info-solid',
      warning: 'exclamation-solid',
      negative: 'close-solid',
    };
    return icons[this.type];
  }

  public getClass() {
    if (this.icon) {
      return 'default-icon';
    }
    return `default-icon ${this.type}-icon`;
  }

  public timeByWords(message: string): number {
    const wordsBySecond = 3;

    // margin is one second
    const marginOfError = 1;
    const second = 1000;
    const result = message.split(' ').length / wordsBySecond + marginOfError;
    return Number(result.toFixed(0)) * second;
  }

  closeNotification() {
    this.notification.nativeElement.remove();
  }

  closeAuto(closeIn: number = this.timeByWords(this.message)) {
    if (this.fixed) {
      return;
    }
    this.timer = setTimeout(() => {
      this.closeNotification();
    }, closeIn);
  }

  mouseEnter() {
    clearTimeout(this.timer);
  }

  mouseLeave() {
    this.closeAuto();
  }

  ngOnInit() {
    this.closeAuto();
  }
}
