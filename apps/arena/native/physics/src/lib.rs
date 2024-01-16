#![allow(non_snake_case)] // rustler macros generate non snake case names and dont use this allow themselves

mod collision_detection;
mod game_state;
mod map;

use std::collections::HashMap;

use crate::game_state::GameState;
use crate::map::Entity;

#[rustler::nif()]
fn add(a: i64, b: i64) -> i64 {
    a + b
}

#[rustler::nif()]
fn new_game(game_id: String) -> GameState {
    GameState::new(game_id)
}

#[rustler::nif()]
fn move_entities(entities: HashMap<u64, Entity>) -> HashMap<u64, Entity> {
    let mut entities: HashMap<u64, Entity> = entities;

    for entity in entities.values_mut() {
        entity.move_entity();
    }

    entities
}

#[rustler::nif()]
/// Check players inside the player_id radius
/// Return a list of the players id inside the radius Vec<player_id>
fn check_collisions(entity: Entity, entities: HashMap<u64, Entity>) -> Vec<u64> {
    let mut entity: Entity = entity;
    let ent = entities.into_values().collect();

    entity.collides_with(ent)
}

rustler::init!(
    "Elixir.Physics",
    [add, new_game, check_collisions, move_entities]
);