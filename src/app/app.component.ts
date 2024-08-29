import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvaturnSDK } from '@avaturn/sdk';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'avaturn';

  @ViewChild('loadButton') loadButton!: ElementRef<HTMLButtonElement>;

  loadAvaturn(button: HTMLButtonElement) {
    const container = document.getElementById('avaturn-sdk-container');
    if (!container) {
      console.error('Container element not found');
      return;
    }

    // Show the container
    container.style.display = 'block';

    // Hide the button
    button.style.display = 'none';

    const subdomain = '3davatar1';
    const url = `https://${subdomain}.avaturn.dev`;

    // Initialize the Avaturn SDK
    const sdk = new AvaturnSDK();
    sdk
      .init(container, { url })
      .then(() => {
        sdk.on('export', (data) => {
          alert(
            '[callback] Avatar exported. See logs to explore the returned data.'
          );
          console.log(data);
          // INSERT YOUR CODE TO HANDLE EXPORT HERE!
        });
      })
      .catch((error) => {
        console.error('Failed to initialize Avaturn SDK:', error);
      });
  }
}
