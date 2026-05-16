import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'himmelsdorf-scenarios',
    number: '01',
    title: 'Himmelsdorf scenarios',
    tagline: 'Random Events on Himmelsdorf — zeppelin crash and train crash.',
    intro:
      'As part of the Random Events feature, I introduce a series of scenarios that dynamically alter the geometry ' +
      'of existing World of Tanks maps. For the Himmelsdorf map, I integrated two specific events: a zeppelin crash ' +
      'and a train bombardment.',
    meta: {
      game: 'World of Tanks',
      studio: 'Wargaming',
      year: 2023, // TODO: confirm with author
      role: 'Scenario Design',
    },
    hero: { type: 'image', src: '/assets/projects/himmelsdorf-scenarios/hero.png' },
    thumbnail: '/assets/projects/himmelsdorf-scenarios/thumbnail.jpg',
    sections: [
      {
        kind: 'scenario',
        label: 'Scenario 01',
        title: 'Zeppelin crash',
        body:
          'A first-of-its-kind, massive airship was shot down while flying over a German city. Its crash introduces ' +
          'new positions and strategic opportunities to change the flow of battle on the map. During development, ' +
          'I collaborated with modellers, animators, level and tech artists, historians, gameplay and server programmers, ' +
          'as well as QA engineers. This cross-functional effort ensured the scenario was visually stunning and grand in scale, ' +
          'while remaining technically optimized and stable. Most importantly, it provides meaningful improvements to the ' +
          'overall gameplay experience during battles on this map.',
        map: '/assets/projects/himmelsdorf-scenarios/zeppelin-map.png',
        media: [
          '/assets/projects/himmelsdorf-scenarios/zeppelin-01.png',
          '/assets/projects/himmelsdorf-scenarios/zeppelin-02.png',
          '/assets/projects/himmelsdorf-scenarios/zeppelin-03.png',
        ],
      },
      {
        kind: 'iteration',
        label: 'Iteration',
        title: 'From basic concrete plates to polished zeppelin',
        body:
          'The scenario underwent a full development cycle, starting from a basic blockout using legacy models and ' +
          'concrete blocks to the final placement of high-quality assets. Each stage was refined through multiple ' +
          'iterations and internal playtests to ensure optimal flow and balance.',
      },
      {
        kind: 'logic',
        label: 'Logic',
        title: 'Logic behind',
        body:
          'Before the zeppelin crash, the map featured several areas with limited positions. The frontline was quite ' +
          'wide, but opportunities for close-quarters engagements were limited. Additionally, there was no way to ' +
          'rotate or switch between the hilltop Castle and the city below. To increase variety, I added geometry directly ' +
          'along the frontline, blocking certain sightlines (long-range shots) while opening up safe paths for closing ' +
          'the distance and maneuvering. Most importantly, I created a new traversal route allowing players to descend ' +
          'from the Castle into the city.',
      },
      {
        kind: 'scenario',
        label: 'Scenario 02',
        title: 'Train crash',
        body:
          'An equally thrilling and massive scenario unfolds on another part of the map. A cargo train travelling along ' +
          'the railway is ambushed and subjected to an aerial bombardment. The bombs destroy the tracks, causing the train ' +
          'to derail and overturn along the entire length of the map rails.',
        map: '/assets/projects/himmelsdorf-scenarios/train-map.png',
        media: [
          '/assets/projects/himmelsdorf-scenarios/train-01.png',
          '/assets/projects/himmelsdorf-scenarios/train-02.png',
          '/assets/projects/himmelsdorf-scenarios/train-03.png',
          '/assets/projects/himmelsdorf-scenarios/train-04.png',
        ],
      },
      {
        kind: 'iteration',
        label: 'Stages',
        title: 'Stages of development the train scenario',
        body:
          'By experimenting with various animations, train starting points, travel directions, and the final layout of ' +
          'the derailed cars across numerous playtests, I was able to determine the optimal combination of these elements.',
      },
      {
        kind: 'logic',
        label: 'Logic',
        title: 'Logic behind',
        body:
          'This area of the map is typically negative space — a "dead zone" with extremely limited cover where movement ' +
          "usually results in the player's destruction. While this design serves a purpose in standard matches, the Random " +
          "Events feature allows us to transform the map dynamically, adding depth to the gameplay. By strategically placing " +
          "the wreckage to block long-range shot lines, I've created a safer environment in this sector. This enables more " +
          'aggressive movement along the rails and introduces new tactical positions behind the wagons and coal piles, ' +
          'significantly diversifying the gameplay in this lane.',
      },
    ],
    // TODO: paste actual YouTube embed URL from /portfolio/1
  },

  {
    slug: 'siegfried-line-scenarios',
    number: '02',
    title: 'Siegfried line scenarios',
    tagline: 'City bombardment and bomber crash on the Siegfried Line.',
    intro:
      'As part of the Random Events feature, I implemented a series of scenarios that dynamically alter the geometry of ' +
      'existing World of Tanks maps. For the Siegfried Line map, I integrated two specific events: a city bombardment and a plane crash.',
    meta: {
      game: 'World of Tanks',
      studio: 'Wargaming',
      year: 2023, // TODO: confirm with author
      role: 'Scenario Design',
    },
    hero: { type: 'image', src: '/assets/projects/siegfried-line-scenarios/hero.png' },
    thumbnail: '/assets/projects/siegfried-line-scenarios/thumbnail.jpg',
    sections: [
      {
        kind: 'scenario',
        label: 'Scenario 01',
        title: 'City bombardment',
        body:
          'To this day, this scenario serves as the benchmark for the entire Random Events feature. The new positions and ' +
          "routes it introduces offer numerous tactical opportunities for both teams. Crucially, the scenario enhances the " +
          "map's original gameplay intent rather than fundamentally changing it. During production, I not only managed the " +
          'scenario through the complete development lifecycle — from prototype to release — but I also led internal playtests ' +
          'to pinpoint the optimal configuration of the new geometry. Additionally, I took the initiative to train a new team ' +
          'of animators and VFX artists on the scenario development pipeline.',
        map: '/assets/projects/siegfried-line-scenarios/city-map.png',
        media: [
          '/assets/projects/siegfried-line-scenarios/city-01.png',
          '/assets/projects/siegfried-line-scenarios/city-02.png',
          '/assets/projects/siegfried-line-scenarios/city-03.png',
          '/assets/projects/siegfried-line-scenarios/city-04.png',
          '/assets/projects/siegfried-line-scenarios/city-05.png',
        ],
      },
      {
        kind: 'iteration',
        label: 'Process',
        title: 'Sometimes houses are just basic slabs',
        body:
          'During the conceptual and testing phases, I often work with existing project resources. I frequently source ' +
          'available assets, effects, and animations to build scenarios. However, it is also common for me to recreate the ' +
          'desired geometry from scratch using basic primitives to validate the layout.',
      },
      {
        kind: 'logic',
        label: 'Logic',
        title: 'Logic behind',
        body:
          'Before the scenario, the map featured several areas with positions that formed various isolated lanes and ' +
          'corridors. However, there was almost no interconnectivity between them. By opening up city blocks and creating ' +
          'new positions from destroyed buildings, I established connectivity between all three lanes. Crucially, the ' +
          'frontline remained stable, and the overall combat pacing was preserved. These new positions and routes successfully ' +
          'diversified the gameplay experience on the map.',
      },
      {
        kind: 'scenario',
        label: 'Scenario 02',
        title: 'Bomber crash',
        body:
          "Another scenario on this map features a large bomber crashing at the map's edge after a dogfight, clipping the " +
          'corner of a building with its wing. While this event is less transformative than the city bombardment, it integrates ' +
          'seamlessly into the local gameplay. It creates situational cover and blocks long-range sightlines, facilitating safer ' +
          'movement through the area.',
        map: '/assets/projects/siegfried-line-scenarios/bomber-map.png',
        media: [
          '/assets/projects/siegfried-line-scenarios/bomber-01.png',
          '/assets/projects/siegfried-line-scenarios/bomber-02.png',
          '/assets/projects/siegfried-line-scenarios/bomber-03.png',
        ],
      },
      {
        kind: 'iteration',
        label: 'Process',
        title: 'Animation is also a part of my duties',
        body:
          'Before transitioning to the production phase and kicking off the tasks for 3D, VFX, animation, and level art teams, ' +
          'I must finalize the level geometry. To ensure full immersion during internal playtests, I am always tasked with ' +
          'creating a complete scenario draft. This means that developing the Level Sequence draft is also an integral part of my workflow.',
      },
      {
        kind: 'logic',
        label: 'Logic',
        title: 'Logic behind',
        body:
          'Long-range engagements and sniping dominate this flank. Advancing against the enemy is difficult and unintuitive, ' +
          'leaving players highly vulnerable during any attempt to close the distance. Consequently, the wreckage of the crashed ' +
          'aircraft effectively creates new cover and obstructs several long-range sightlines. This establishes fresh positions ' +
          'within the sector and allows for much safer movement and rotation.',
      },
    ],
    // TODO: paste actual YouTube embed URL from /portfolio/2
  },

  {
    slug: 'airfield-map',
    number: '03',
    title: 'Airfield map',
    tagline: 'Complete rebuild of the Airfield map.',
    intro:
      'I spearheaded a complete overhaul of the Airfield map, essentially rebuilding it from scratch. Recognizing that previous ' +
      'minor adjustments had failed to improve player satisfaction, I took the initiative to design an entirely new map layout ' +
      'while preserving the established African desert coast setting.',
    meta: {
      game: 'World of Tanks',
      studio: 'Wargaming',
      year: 2024, // TODO: confirm with author — update 1.28.1
      role: 'Level Design',
    },
    hero: { type: 'image', src: '/assets/projects/airfield-map/hero.png' },
    thumbnail: '/assets/projects/airfield-map/thumbnail.jpg',
    sections: [
      {
        kind: 'zone',
        label: 'Zone 01',
        title: 'The Cave',
        body:
          'The Cave is a dedicated engagement zone for heavy armor. Within its walls and under its natural roof, heavy, ' +
          'slow-moving vehicles can fight in relative isolation, shielded from outside interference. To add gameplay variety, ' +
          'I implemented a sub-sector on top of the cave, where positions are spaced further apart, resulting in a more methodical ' +
          'and measured pace.',
        map: '/assets/projects/airfield-map/zone-overview.png',
        media: ['/assets/projects/airfield-map/overview-01.png'],
      },
      {
        kind: 'zone',
        label: 'Zone 02',
        title: 'The Dunes',
        body:
          'This type of natural terrain is rarely utilized in our game. However, dunes are exceptionally effective for facilitating ' +
          'gameplay along the entire length of the ridge. They provide players with a sense of control and significantly diversify the ' +
          "experience, as a viable firing position can be found anywhere along the dune's crest.",
      },
      {
        kind: 'zone',
        label: 'Zone 03',
        title: 'The Coastline',
        body:
          'Since the dunes are designed for long-range positional play, I needed to provide a high-mobility sub-sector where fast ' +
          'vehicles could close the gap for more aggressive engagements. The coastline serves this exact purpose, offering a dedicated ' +
          'flank for rapid maneuvers and close-quarters pressure.',
      },
      {
        kind: 'zone',
        label: 'Zone 04',
        title: 'The Central Oasis & Bush Line',
        body:
          'The Central Oasis serves as the primary link between the dunes. Here, Light Tanks and scouts can maximize their view range ' +
          'to effectively spot enemy forces positioned across the ridgelines. The Bush Line is a situational tactical element that allows ' +
          "players to stealthily infiltrate the enemy's rear under specific conditions. However, it's a high-risk maneuver: if you are " +
          'detected, there is virtually no cover to escape.',
      },
      {
        kind: 'zone',
        label: 'Zone 05',
        title: 'Holding Positions',
        body:
          'No map is complete without these. The presence of second-line defensive positions with oversight of key map areas allows for a ' +
          "controlled deceleration of the battle's pace. This creates opportunities for a comeback, enabling a team to flip the momentum in " +
          'their favor even if they were initially at a disadvantage.',
      },
    ],
    // TODO: paste actual YouTube embed URL from /portfolio/3
  },

  {
    slug: 'paris-bridge-bombardment',
    number: '04',
    title: 'Bridge bombardment on Paris',
    tagline: 'V-2 rocket bridge bombardment scenario.',
    intro:
      'The V-2 rocket bombardment of the bridge on the Paris map is an example of a relatively straightforward scenario. However, given ' +
      "that the lane where it occurs is already considered well-designed, the primary challenge was to 'do no harm.' The goal was to " +
      'enhance the gameplay depth without disrupting the existing balance that players already enjoy.',
    meta: {
      game: 'World of Tanks',
      studio: 'Wargaming',
      year: 2023, // TODO: confirm with author
      role: 'Scenario Design',
    },
    hero: { type: 'image', src: '/assets/projects/paris-bridge-bombardment/hero.jpg' },
    thumbnail: '/assets/projects/paris-bridge-bombardment/thumbnail.jpg',
    sections: [
      {
        kind: 'iteration',
        label: 'Stages',
        title: 'Bridge through its stages',
        body:
          'This was a textbook scenario where the team followed a well-established, time-tested process. As with previous events, I ' +
          'developed the geometry starting from the graybox stage for internal testing, and subsequently oversaw the 3D, level art, and ' +
          'animation teams to ensure a flawless release with no technical or design issues.',
        map: '/assets/projects/paris-bridge-bombardment/bridge-map.png',
        media: [
          '/assets/projects/paris-bridge-bombardment/bridge-01.png',
          '/assets/projects/paris-bridge-bombardment/bridge-02.png',
          '/assets/projects/paris-bridge-bombardment/bridge-03.png',
        ],
      },
      {
        kind: 'logic',
        label: 'Logic',
        title: 'Logic behind',
        body:
          'Prior to the event, this area was already a solid brawling zone for heavy vehicles. A variety of positions and tactical options ' +
          'provided good versatility in this sector, and maintaining momentum to push through the flank was relatively straightforward. ' +
          "Therefore, the primary goal for this scenario was to 'do no harm.' The objective was to complement the existing gameplay by " +
          'providing even more tactical opportunities. The destroyed bridge introduces new positions among the debris and opens up previously ' +
          'inaccessible routes to the upper roadway.',
      },
    ],
    // TODO: paste actual YouTube embed URL from /portfolio/4
  },

  {
    slug: 'cliff-lighthouse-crash',
    number: '05',
    title: 'Lighthouse crash scenario',
    tagline: 'Random Events on Cliff — the lighthouse falls.',
    intro:
      'As part of the Random Events feature, I implemented the destruction of the iconic lighthouse on the Cliff map. In this ' +
      'scenario, a bomber attempting to evade a pursuit loses control and strikes the lighthouse with its wing. The impact causes ' +
      'a section of the structure to collapse, leading the lighthouse to tilt and fall. The aircraft itself eventually crashes on ' +
      'the opposite side of the map.',
    meta: {
      game: 'World of Tanks',
      studio: 'Wargaming',
      year: 2024, // TODO: confirm with author
      role: 'Scenario Design',
    },
    hero: { type: 'image', src: '/assets/projects/cliff-lighthouse-crash/hero.png' },
    thumbnail: '/assets/projects/cliff-lighthouse-crash/thumbnail.jpg',
    sections: [
      {
        kind: 'scenario',
        label: 'Scenario',
        title: 'Lighthouse crash',
        body:
          'The bomber clips the lighthouse mid-flight; a section of the structure collapses and the tower tilts and falls onto ' +
          'the mountain slope below. The aircraft itself eventually crashes on the opposite side of the map.',
        map: '/assets/projects/cliff-lighthouse-crash/lighthouse-map.png',
        media: [
          '/assets/projects/cliff-lighthouse-crash/lighthouse-01.png',
          '/assets/projects/cliff-lighthouse-crash/lighthouse-02.png',
          '/assets/projects/cliff-lighthouse-crash/lighthouse-03.png',
        ],
      },
      {
        kind: 'iteration',
        label: 'Layout',
        title: 'Occasionally, we need to adjust the original map layout',
        body:
          "To maximize the gameplay impact, I needed the lighthouse debris to land specifically on the mountain slope. Balancing " +
          "this with the animation team's requirement for realistic destruction physics, I slightly shifted the lighthouse's " +
          'original position toward the edge of the cliff.',
      },
      {
        kind: 'logic',
        label: 'Logic',
        title: 'Logic behind',
        body:
          'The map features a dominant high ground — the hill where the lighthouse stands. Before its destruction, capturing this ' +
          'height is extremely difficult, as the approach is exposed to fire from multiple enemy positions. Typically, only Light ' +
          'Tanks can contest this area during the early-game deployment. After the lighthouse is destroyed, its debris obstructs one ' +
          'of the primary firing lanes covering the ascent. This makes reaching the hilltop much easier, even during the mid-game. ' +
          'Additionally, the wreckage on the slope creates new tactical positions, allowing players to establish a foothold and ' +
          "engage the enemy effectively. Consequently, the hill becomes accessible to almost any vehicle class mid-match. However, " +
          "since the event's timing and activation probability are randomized, this remains a situational opportunity rather than an " +
          "overpowered strategy, preserving the map's core gameplay.",
      },
    ],
    // TODO: paste actual YouTube embed URL from /portfolio/5
  },

  {
    slug: 'highway-train-derailment',
    number: '06',
    title: 'Highway scenario',
    tagline: 'Train derailment onto the city streets.',
    intro:
      'One of the final scenarios developed for the Random Events feature. A train pursued by aircraft comes under fire; the ' +
      'resulting bombardment destroys the tracks, causing the train to derail and crash directly onto the city streets. This ' +
      'event introduces fresh tactical cover and obstructs long-range sightlines, making the urban combat more secure and engaging.',
    meta: {
      game: 'World of Tanks',
      studio: 'Wargaming',
      year: 2024, // TODO: confirm with author
      role: 'Scenario Design',
    },
    hero: { type: 'image', src: '/assets/projects/highway-train-derailment/hero.png' },
    thumbnail: '/assets/projects/highway-train-derailment/thumbnail.jpg',
    sections: [
      {
        kind: 'scenario',
        label: 'Scenario',
        title: 'Train derailment',
        body:
          'A train pursued by aircraft comes under fire; the bombardment destroys the tracks, causing the train to derail and crash ' +
          'directly onto the city streets. The wreckage introduces fresh tactical cover and obstructs long-range sightlines, making ' +
          'the urban combat more secure and engaging.',
        map: '/assets/projects/highway-train-derailment/train-map.png',
        media: [
          '/assets/projects/highway-train-derailment/train-01.png',
          '/assets/projects/highway-train-derailment/train-02.png',
          '/assets/projects/highway-train-derailment/train-03.png',
        ],
      },
      {
        kind: 'iteration',
        label: 'Process',
        title: 'Trains are always difficult',
        body:
          'While every individual wagon is a potential piece of gameplay cover, developing a scenario involving an entire train ' +
          'derailment is a massive technical challenge. Animating each car, analyzing the server-side performance impact, and preventing ' +
          'potential network desyncs — all while assembling and testing the scenario within complex prefab structures — represents only ' +
          'a fraction of the work required to bring such an event to life.',
      },
      {
        kind: 'logic',
        label: 'Logic',
        title: 'Logic behind',
        body:
          'In the urban sector of the map, several city blocks are separated by a railway. Typically, playing around the corners of ' +
          'the buildings here is inconvenient because the main positions are angled diagonally from one another, and the blocks are ' +
          'oriented perpendicularly. Furthermore, long-range cross-fire from support positions outside the city limits active advancement ' +
          'through the urban area. The train wreckage fits this area perfectly. We established new positions at varying engagement ' +
          'distances, making the gameplay in this sector more intuitive and dynamic. The fallen wagons successfully blocked long-range ' +
          'sightlines, creating a much safer environment for heavy tanks to battle.',
      },
    ],
    // TODO: paste actual YouTube embed URL from /portfolio/6
  },
];
