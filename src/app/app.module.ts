import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule, MatDatepickerModule, MatIconModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, MatFormFieldModule, MatInputModule, MatRadioModule, MatListModule } from '@angular/material';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDividerModule } from '@angular/material/divider';
import { PoliticalNDADashBoardComponent } from './political-nda-dash-board/political-nda-dash-board.component';
import { RealTimegraphComponent } from './real-timegraph/real-timegraph.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { MultiLineChartComponent } from './multi-line-chart/multi-line-chart.component';
import { OrganisationIbmDashboardComponent } from './organisation-ibm-dashboard/organisation-ibm-dashboard.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from './components/components.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExamplesModule } from './examples/examples.module';



import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';

// Services
import { ActivityService } from './service/activity.service';
import { RealTimeOrganisationChartComponent } from './real-time-organisation-chart/real-time-organisation-chart.component';
import { ChartjsModule } from '@ctrl/ngx-chartjs';
import { LiveFeedComponent } from './live-feed/live-feed.component';
// import { LandingComponent } from './landing/landing.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PoliticalNDADashBoardComponent,
    RealTimegraphComponent,
    BarChartComponent,
    PieChartComponent,
    MultiLineChartComponent,
    OrganisationIbmDashboardComponent,
    RealTimeOrganisationChartComponent,
    NavbarComponent,
    FooterComponent,
    LiveFeedComponent
    // LandingComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule,
    NgbModule.forRoot(),
    ComponentsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatListModule,
    MatDialogModule,
    MatTooltipModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDividerModule,
    ChartjsModule,
    ExamplesModule
  ],
  providers: [ActivityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
