import type { Project } from './types';

export const projects: Project[] = [
  {
    slug: 'himmelsdorf-scenarios',
    number: '01',
    title: 'Himmelsdorf scenarios',
    tagline: 'Random Events on Himmelsdorf — zeppelin crash and train crash.',
    intro:
      'As part of the Random Events feature, I implemented a series of scenarios that dynamically alter the geometry ' +
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
      },
      {
        kind: 'iteration',
        label: 'Iteration',
        title: 'From basic concrete plates to polished zeppelin',
        body:
          'The scenario underwent a full development cycle, starting from a basic blockout using legacy models and ' +
          'concrete blocks to the final placement of high-quality assets. Each stage was refined through multiple ' +
          'iterations and internal playtests to ensure optimal flow and balance.',
        media: [
          '/assets/projects/himmelsdorf-scenarios/zeppelin-01.png',
          '/assets/projects/himmelsdorf-scenarios/zeppelin-02.png',
          '/assets/projects/himmelsdorf-scenarios/zeppelin-03.png',
        ],
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
        beforeAfter: [
          {
            before: '/assets/projects/himmelsdorf-scenarios/zeppelin-before.png',
            after: '/assets/projects/himmelsdorf-scenarios/zeppelin-after.png',
          },
        ],
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
      },
      {
        kind: 'iteration',
        label: 'Stages',
        title: 'Stages of development the train scenario',
        body:
          'By experimenting with various animations, train starting points, travel directions, and the final layout of ' +
          'the derailed cars across numerous playtests, I was able to determine the optimal combination of these elements.',
        media: [
          '/assets/projects/himmelsdorf-scenarios/train-01.png',
          '/assets/projects/himmelsdorf-scenarios/train-02.png',
          '/assets/projects/himmelsdorf-scenarios/train-03.png',
          '/assets/projects/himmelsdorf-scenarios/train-04.png',
        ],
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
        beforeAfter: [
          {
            before: '/assets/projects/himmelsdorf-scenarios/train-before.png',
            after: '/assets/projects/himmelsdorf-scenarios/train-after.png',
          },
        ],
      },
    ],
    closingVideo: 'https://www.youtube.com/embed/aKRCXbflrQE',
  },

  {
    slug: 'airfield-map',
    number: '02',
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
        kind: 'logic',
        label: 'Logic',
        title: 'Logic behind',
        body: 'test',
        map: '/assets/projects/airfield-map/zone-overview.png',
        media: ['/assets/projects/airfield-map/overview-01.png'],
      },
      {
        kind: 'zone',
        label: 'Zone 01',
        title: 'The Cave',
        body:
          'The Cave is a dedicated engagement zone for heavy armor. Within its walls and under its natural roof, heavy, ' +
          'slow-moving vehicles can fight in relative isolation, shielded from outside interference. To add gameplay variety, ' +
          'I implemented a sub-sector on top of the cave, where positions are spaced further apart, resulting in a more methodical ' +
          'and measured pace.',
        media: [
          '/assets/projects/airfield-map/cave-01.png',
          '/assets/projects/airfield-map/cave-02.png',
        ],
      },
      {
        kind: 'zone',
        label: 'Zone 02',
        title: 'The Dunes',
        body:
          'This type of natural terrain is rarely utilized in our game. However, dunes are exceptionally effective for facilitating ' +
          'gameplay along the entire length of the ridge. They provide players with a sense of control and significantly diversify the ' +
          "experience, as a viable firing position can be found anywhere along the dune's crest.",
        media: [
          '/assets/projects/airfield-map/dunes-01.png',
          '/assets/projects/airfield-map/dunes-02.png',
        ],
      },
      {
        kind: 'zone',
        label: 'Zone 03',
        title: 'The Coastline',
        body:
          'Since the dunes are designed for long-range positional play, I needed to provide a high-mobility sub-sector where fast ' +
          'vehicles could close the gap for more aggressive engagements. The coastline serves this exact purpose, offering a dedicated ' +
          'flank for rapid maneuvers and close-quarters pressure.',
        media: [
          '/assets/projects/airfield-map/coastline-01.png',
          '/assets/projects/airfield-map/coastline-02.png',
        ],
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
        media: [
          '/assets/projects/airfield-map/oasis-01.png',
          '/assets/projects/airfield-map/oasis-02.png',
        ],
      },
      {
        kind: 'zone',
        label: 'Zone 05',
        title: 'Holding Positions',
        body:
          'No map is complete without these. The presence of second-line defensive positions with oversight of key map areas allows for a ' +
          "controlled deceleration of the battle's pace. This creates opportunities for a comeback, enabling a team to flip the momentum in " +
          'their favor even if they were initially at a disadvantage.',
        media: [
          '/assets/projects/airfield-map/holding-01.png',
          '/assets/projects/airfield-map/holding-02.png',
        ],
      },
    ],
    closingVideo: 'https://www.youtube.com/embed/kOj0usIhBp0',
  },

  {
    slug: 'brawl-school-neon-dash',
    number: '03',
    title: 'Brawl school',
    tagline: 'Neon Dash — a battle racing mode with moving obstacles.',
    intro:
      'Neon Dash is a limited-time battle racing mode with moving obstacles. It was a complete genre shift for World ' +
      'of Tanks, turning a tactical vehicle shooter into an arcade racer.',
    meta: {
      game: 'World of Tanks',
      studio: 'Wargaming',
      year: 2026, // TODO: confirm with author
      role: 'Level Design',
    },
    hero: { type: 'image', src: '/assets/projects/brawl-school-neon-dash/hero.png' },
    thumbnail: '/assets/projects/brawl-school-neon-dash/thumbnail.jpg',
    sections: [
      {
        kind: 'zone',
        label: 'Focus',
        title: 'My work on this map',
        body:
          'Track Layout — designed a racetrack that adapts tank physics for fast-paced gameplay.\n' +
          "Dynamic Obstacles — integrated moving platforms and hazards to test players' timing and driving skills.\n" +
          'PvP Interaction — structured the arena to encourage constant combat, where players use impulse charges ' +
          'to push each other off the track.',
        map: '/assets/projects/brawl-school-neon-dash/overview-map.jpg',
      },
      {
        kind: 'zone',
        label: 'Scheme',
        title: 'Scheme',
        body:
          'My goal was to create a moderately challenging track focused on high player-to-player interaction and ' +
          'map engagement.\n\n' +
          'My design choices:\n' +
          'High-Interaction Layout — narrowed lanes, reduced safe zones, and added more pits to encourage knocking ' +
          'opponents off the track.\n' +
          'Linear Navigation — the track is completely linear. Players see the finish line from the start, ' +
          'preventing navigation confusion during chaotic combat.\n' +
          'Structure — the layout is divided into 3 distinct progression zones based on this pacing logic.\n' +
          'Pacing — alternated intense obstacle sections with brief breathing rooms. Added longer, low-risk ' +
          'alternative routes to balance overall difficulty.',
        map: '/assets/projects/brawl-school-neon-dash/scheme.jpg',
      },
      {
        kind: 'zone',
        label: 'Stage 1',
        title: 'Stage 1',
        body:
          'Immediately after the start, players slide down onto a hazardous platform filled with pits. This section ' +
          'serves as a low-penalty combat zone where players can jump over hazards using trampolines and ram each ' +
          'other without frustration, thanks to a nearby respawn point.\n\n' +
          'For a high-risk trade-off, players can attempt to bypass the entire platform by using large trampolines; ' +
          'failing the jump results in an immediate pitfall, but success grants them a significant shortcut.',
        media: ['/assets/projects/brawl-school-neon-dash/stage1-01.png'],
      },
      {
        kind: 'zone',
        label: 'Stage 2',
        title: 'Stage 2',
        body:
          'Phase 2 features a split pathway where the right track is positioned lower than the upper-left track. ' +
          'Since this is near the start of the race, the obstacles here remain relatively simple.\n\n' +
          'However, due to its lower elevation, the right path serves as the most natural, intuitive continuation ' +
          'from Stage 1, which data showed most players naturally preferred. To balance this high traffic, the ' +
          'obstacles on the right track are intentionally more challenging, featuring lasers, whereas the upper-left ' +
          'track offers simpler moving blocks.\n\n' +
          'This stage concludes with the first major obstacle: the Carousel. I intentionally made its rotation ' +
          'pattern unpredictable to slow down the leading players and pack the field back together. To prevent ' +
          'unfair frustration, a safe zone is placed directly before this hazard, allowing players to briefly wait ' +
          'and time the carousel approach in relative safety.',
        media: [
          '/assets/projects/brawl-school-neon-dash/stage2-01.png',
          '/assets/projects/brawl-school-neon-dash/stage2-02.png',
          '/assets/projects/brawl-school-neon-dash/stage2-03.png',
        ],
      },
      {
        kind: 'zone',
        label: 'Stage 3',
        title: 'Stage 3',
        body:
          'Stage 3 is the most challenging section of the map, featuring narrow tracks, heavily holey platforms, and ' +
          'long-distance jumps. It serves as the primary catch-up mechanic where trailing players can overtake the ' +
          'leaders.\n\n' +
          'At the start of this section, a split layout offers an alternate bypass route for those wanting to avoid ' +
          'the jumps, though this route still maintains a baseline level of hazard to ensure it remains a balanced ' +
          'choice.\n\n' +
          'The track concludes with a high-intensity hazard codenamed the "Washing Machine," featuring a dense ' +
          'cluster of platforms moving in opposite directions over open pits. This final bottleneck forces intense ' +
          'player interaction, where opponents can either cooperate to secure the finish or sabotage each other. ' +
          'A well-timed impulse shot here can knock a rival off the platform, triggering a high-penalty respawn all ' +
          'the way back to the start of Stage 3.',
        media: [
          '/assets/projects/brawl-school-neon-dash/stage3-01.png',
          '/assets/projects/brawl-school-neon-dash/stage3-02.png',
          '/assets/projects/brawl-school-neon-dash/stage3-03.png',
        ],
      },
    ],
    closingVideo: 'https://www.youtube.com/embed/oA9sebGUzwY',
  },

  {
    slug: 'siegfried-line-scenarios',
    number: '04',
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
      },
      {
        kind: 'iteration',
        label: 'Process',
        title: 'Sometimes houses are just basic slabs',
        body:
          'During the conceptual and testing phases, I often work with existing project resources. I frequently source ' +
          'available assets, effects, and animations to build scenarios. However, it is also common for me to recreate the ' +
          'desired geometry from scratch using basic primitives to validate the layout.',
        media: [
          '/assets/projects/siegfried-line-scenarios/city-01.png',
          '/assets/projects/siegfried-line-scenarios/city-02.png',
          '/assets/projects/siegfried-line-scenarios/city-03.png',
          '/assets/projects/siegfried-line-scenarios/city-04.png',
          '/assets/projects/siegfried-line-scenarios/city-05.png',
        ],
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
        beforeAfter: [
          {
            before: '/assets/projects/siegfried-line-scenarios/city-before.png',
            after: '/assets/projects/siegfried-line-scenarios/city-after.png',
          },
        ],
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
      },
      {
        kind: 'iteration',
        label: 'Process',
        title: 'Animation is also a part of my duties',
        body:
          'Before transitioning to the production phase and kicking off the tasks for 3D, VFX, animation, and level art teams, ' +
          'I must finalize the level geometry. To ensure full immersion during internal playtests, I am always tasked with ' +
          'creating a complete scenario draft. This means that developing the Level Sequence draft is also an integral part of my workflow.',
        media: [
          '/assets/projects/siegfried-line-scenarios/bomber-01.png',
          '/assets/projects/siegfried-line-scenarios/bomber-02.png',
          '/assets/projects/siegfried-line-scenarios/bomber-03.png',
        ],
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
        beforeAfter: [
          {
            before: '/assets/projects/siegfried-line-scenarios/bomber-before.png',
            after: '/assets/projects/siegfried-line-scenarios/bomber-after.png',
          },
        ],
      },
    ],
    closingVideo: 'https://www.youtube.com/embed/hhL41xOG7BM',
  },

  {
    slug: 'paris-bridge-bombardment',
    number: '05',
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
        kind: 'scenario',
        label: 'Scenario',
        title: 'Bridge bombardment',
        body: '',
        map: '/assets/projects/paris-bridge-bombardment/bridge-map.png',
      },
      {
        kind: 'iteration',
        label: 'Stages',
        title: 'Bridge through its stages',
        body:
          'This was a textbook scenario where the team followed a well-established, time-tested process. As with previous events, I ' +
          'developed the geometry starting from the graybox stage for internal testing, and subsequently oversaw the 3D, level art, and ' +
          'animation teams to ensure a flawless release with no technical or design issues.',
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
        beforeAfter: [
          {
            before: '/assets/projects/paris-bridge-bombardment/bridge-before.png',
            after: '/assets/projects/paris-bridge-bombardment/bridge-after.png',
          },
        ],
      },
    ],
    closingVideo: 'https://www.youtube.com/embed/XeIdGRWMaZ8',
  },

  {
    slug: 'cliff-lighthouse-crash',
    number: '06',
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
        body: '',
        map: '/assets/projects/cliff-lighthouse-crash/lighthouse-map.png',
      },
      {
        kind: 'iteration',
        label: 'Layout',
        title: 'Occasionally, we need to adjust the original map layout',
        body:
          "To maximize the gameplay impact, I needed the lighthouse debris to land specifically on the mountain slope. Balancing " +
          "this with the animation team's requirement for realistic destruction physics, I slightly shifted the lighthouse's " +
          'original position toward the edge of the cliff.',
        media: [
          '/assets/projects/cliff-lighthouse-crash/lighthouse-01.png',
          '/assets/projects/cliff-lighthouse-crash/lighthouse-02.png',
          '/assets/projects/cliff-lighthouse-crash/lighthouse-03.png',
        ],
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
        beforeAfter: [
          {
            before: '/assets/projects/cliff-lighthouse-crash/lighthouse-before-1.png',
            after: '/assets/projects/cliff-lighthouse-crash/lighthouse-after-1.png',
          },
          {
            before: '/assets/projects/cliff-lighthouse-crash/lighthouse-before-2.png',
            after: '/assets/projects/cliff-lighthouse-crash/lighthouse-after-2.png',
          },
        ],
      },
    ],
    closingVideo: 'https://www.youtube.com/embed/QZo2fxH5uh0',
  },

  {
    slug: 'highway-train-derailment',
    number: '07',
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
        body: '',
        map: '/assets/projects/highway-train-derailment/train-map.png',
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
        media: [
          '/assets/projects/highway-train-derailment/train-01.png',
          '/assets/projects/highway-train-derailment/train-02.png',
          '/assets/projects/highway-train-derailment/train-03.png',
        ],
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
        beforeAfter: [
          {
            before: '/assets/projects/highway-train-derailment/train-before.png',
            after: '/assets/projects/highway-train-derailment/train-after.png',
          },
        ],
      },
    ],
    closingVideo: 'https://www.youtube.com/embed/ohfrzAV_ycM',
  },
];
