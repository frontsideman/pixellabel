import { MotionPreferences, AmbientMotionController, setupReveals, setupIntro } from './scripts/motion.js';
import { setupNavigation } from './scripts/navigation.js';
import { HorizontalProjects, setupProjectDialogs } from './scripts/projects.js';
import { setupInteractiveText, setupPointerInteractions, setupScrollScenes } from './scripts/interactions.js';

const motion = new MotionPreferences();
new AmbientMotionController(motion);
setupNavigation();
new HorizontalProjects(motion);
setupProjectDialogs();
setupReveals(motion);
setupIntro(motion);
setupInteractiveText(motion);
setupPointerInteractions(motion);
setupScrollScenes(motion);
document.querySelector('#year').textContent = String(new Date().getFullYear());
