import { Routes } from '@angular/router';
import { AddGame } from './components/add-game/add-game';
import { Games } from './components/games/games';
import { Home } from './components/home/home';
import { GameDetail } from './components/game-detail/game-detail';
import { UpdateGame } from './components/update-game/update-game';
import { Problem } from './components/problem/problem';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'add-game', component: AddGame },
    { path: 'games', component: Games },
    { path: 'games/:id', component: GameDetail },
    { path: 'games/:id/update', component: UpdateGame },
    { path: 'problem', component: Problem },
];
