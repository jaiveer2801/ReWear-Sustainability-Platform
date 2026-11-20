import type { CategoryId, Difficulty } from '@/data/content';

export type StepIcon =
  | 'scissors'
  | 'ruler'
  | 'brush'
  | 'wrench'
  | 'droplets'
  | 'layers'
  | 'hammer'
  | 'sparkles'
  | 'package'
  | 'check';

export interface TutorialStep {
  title: string;
  body: string;
  icon: StepIcon;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: CategoryId;
  difficulty: Difficulty;
  budgetInr: number;
  timeMinutes: number;
  image: string;
  imageAlt: string;
  materials: string[];
  tools: string[];
  itemsReused: number;
  steps: TutorialStep[];
}

export const tutorials: Tutorial[] = [
  {
    id: 'tut-denim-tote',
    title: 'Denim Tote Bag from Old Jeans',
    description:
      'Turn a pair of worn jeans into a sturdy everyday tote with reinforced handles and a roomy inside pocket.',
    category: 'clothing',
    difficulty: 'Easy',
    budgetInr: 150,
    itemsReused: 1,
    timeMinutes: 60,
    image: 'https://images.pexels.com/photos/10002670/pexels-photo-10002670.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Person carrying a printed tote bag on a sunny street',
    materials: ['1 pair old jeans (straight or wide leg)', 'Matching thread', 'Fabric scraps for handles (optional)'],
    tools: ['Fabric scissors', 'Ruler and chalk', 'Sewing machine or needle', 'Iron'],
    steps: [
      { title: 'Cut off the legs', body: 'Cut each leg just below the crotch seam, keeping the seams intact. You will use the two leg tubes as the bag body.', icon: 'scissors' },
      { title: 'Measure the bag body', body: 'Lay one leg tube flat and trim the bottom hem so the bag is roughly 35 cm tall. Repeat with the second leg.', icon: 'ruler' },
      { title: 'Sew the bottom', body: 'Place both pieces right sides together, pin the bottom edges and sew a 1 cm seam. Press the seam open with an iron.', icon: 'layers' },
      { title: 'Make the handles', body: 'Cut two strips from the waistband or leftover fabric, 60 cm long and 6 cm wide. Fold in the edges, press and stitch closed.', icon: 'ruler' },
      { title: 'Attach the handles', body: 'Pin each handle inside the bag top, about 10 cm from the side seams. Stitch a square with an X through each end for strength.', icon: 'wrench' },
      { title: 'Finish the top', body: 'Fold the top edge down 1 cm and then 2 cm. Stitch around the opening, then trim any loose threads and turn the bag right side out.', icon: 'check' },
    ],
  },
  {
    id: 'tut-braided-rug',
    title: 'Braided Rug from Old T-Shirts',
    description:
      'Cut old cotton tees into strips, braid them into rope and coil the rope into a soft, washable rug.',
    category: 'clothing',
    difficulty: 'Medium',
    budgetInr: 250,
    itemsReused: 7,
    timeMinutes: 180,
    image: 'https://images.pexels.com/photos/15546844/pexels-photo-15546844.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Close-up of twisted fabric strands',
    materials: ['6 to 8 old cotton t-shirts', 'Strong thread or upholstery twine', 'Fabric glue (optional)'],
    tools: ['Scissors', 'Large safety pin', 'Needle', 'Sewing machine (optional)'],
    steps: [
      { title: 'Prepare the shirts', body: 'Cut off the hems and sleeves, then cut the body into a continuous 4 cm wide spiral. Keep each strip the same width for an even rug.', icon: 'scissors' },
      { title: 'Join the strips', body: 'Knot each new strip to the previous one and stretch them gently so the ends curl into a neat tube.', icon: 'layers' },
      { title: 'Braid three strands', body: 'Tie three strips together at one end. Braid them tightly, keeping the tension even, until the braid is about 3 m long.', icon: 'wrench' },
      { title: 'Coil the rug', body: 'Start at the centre and coil the braid flat, stitching or tacking each loop to the one before it every few centimetres.', icon: 'layers' },
      { title: 'Secure the edge', body: 'When the rug reaches your target size, stitch the last section down firmly and trim the ends so they tuck under.', icon: 'hammer' },
      { title: 'Check and wash', body: 'Lay the rug on a flat floor, press out any ripples and wash on a gentle cycle in cold water before first use.', icon: 'sparkles' },
    ],
  },
  {
    id: 'tut-bottle-vertical-garden',
    title: 'Vertical Garden from Plastic Bottles',
    description:
      'Build a wall-mounted herb garden from clean plastic bottles that fits a balcony, kitchen or window.',
    category: 'plastic',
    difficulty: 'Medium',
    budgetInr: 300,
    itemsReused: 10,
    timeMinutes: 120,
    image: 'https://images.pexels.com/photos/39712892/pexels-photo-39712892.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Vertical garden made from upcycled plastic bottles',
    materials: ['8 to 12 clean 1.5 L plastic bottles', 'Wooden or metal board, 90 cm x 30 cm', 'Potting mix', 'Herb seedlings', 'Thin wire or zip ties'],
    tools: ['Craft knife or sharp scissors', 'Drill with small bit', 'Screwdriver', 'Measuring tape'],
    steps: [
      { title: 'Clean the bottles', body: 'Remove labels and rinse each bottle with warm soapy water. Let them dry completely before you start cutting.', icon: 'droplets' },
      { title: 'Cut the pockets', body: 'Cut each bottle in half around the middle. Keep the bottom halves; they will become the planting pockets.', icon: 'scissors' },
      { title: 'Drill drainage holes', body: 'Make two small holes in the base of each pocket so excess water can drain out freely.', icon: 'wrench' },
      { title: 'Attach to the board', body: 'Arrange the pockets in a staggered grid on the board. Wire each pocket through its rim to the board, leaving a small gap for the roots.', icon: 'hammer' },
      { title: 'Fill and plant', body: 'Fill each pocket with potting mix, leaving 2 cm at the top. Add one herb seedling per pocket and press the soil gently.', icon: 'package' },
      { title: 'Water and hang', body: 'Water until it drains, then mount the board on a sunny wall using wall brackets. Water every two to three days.', icon: 'check' },
    ],
  },
  {
    id: 'tut-self-watering-planter',
    title: 'Self-Watering Planter from a Bottle',
    description:
      'A simple wick-fed planter made from one plastic bottle, perfect for small herbs and succulents.',
    category: 'plastic',
    difficulty: 'Easy',
    budgetInr: 80,
    itemsReused: 1,
    timeMinutes: 45,
    image: 'https://images.pexels.com/photos/37858501/pexels-photo-37858501.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Window sill with bottles and potted plants in sunlight',
    materials: ['1 clean 2 L plastic bottle', 'Cotton rope or strip of cotton cloth', 'Potting mix', 'Small plant or seeds'],
    tools: ['Craft knife or scissors', 'Pen or marker'],
    steps: [
      { title: 'Mark the cut line', body: 'Draw a line around the bottle about one third from the top. This is where the planter will be cut.', icon: 'ruler' },
      { title: 'Cut the bottle', body: 'Carefully cut along the line. Keep the top piece, which will hold the soil, and set the bottom aside as the water reservoir.', icon: 'scissors' },
      { title: 'Add the wick', body: 'Push a cotton rope through the bottle cap and leave one end dangling into the bottom reservoir.', icon: 'wrench' },
      { title: 'Fill with soil', body: 'Place the top piece inside the reservoir, fill it with moist potting mix and plant your seedling.', icon: 'package' },
      { title: 'Add water', body: 'Pour water into the reservoir only. The wick will draw it up to the roots as the soil needs it.', icon: 'droplets' },
      { title: 'Place in light', body: 'Set the planter in bright indirect light. Check the reservoir once a week and top it up when it runs low.', icon: 'check' },
    ],
  },
  {
    id: 'tut-cardboard-desk-organizer',
    title: 'Cardboard Desk Organizer',
    description:
      'Fold a sturdy cardboard box into a tidy desk organizer with compartments for pens, cards and notes.',
    category: 'paper',
    difficulty: 'Easy',
    budgetInr: 40,
    itemsReused: 1,
    timeMinutes: 40,
    image: 'https://images.pexels.com/photos/8473782/pexels-photo-8473782.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Files organized in cardboard boxes on a desk',
    materials: ['1 sturdy cardboard box (shoebox size)', 'Strong packing tape or craft glue', 'Decorative paper (optional)'],
    tools: ['Craft knife', 'Ruler', 'Pencil', 'Bone folder or spoon'],
    steps: [
      { title: 'Flatten the box', body: 'Open the box and cut off the flaps, keeping the main body. Press out the creases so the panels lie flat.', icon: 'scissors' },
      { title: 'Measure the compartments', body: 'Mark two vertical dividers at one third and two thirds of the length. Draw a line across the width to make a middle shelf.', icon: 'ruler' },
      { title: 'Score the lines', body: 'Run the back of a blade or a spoon along each line to make a clean fold.', icon: 'brush' },
      { title: 'Cut the slots', body: 'Cut the dividers so they can slide into each other at the middle, forming a grid of cells.', icon: 'scissors' },
      { title: 'Assemble and tape', body: 'Fold up the sides, slot the dividers together and tape every joint from the inside for strength.', icon: 'wrench' },
      { title: 'Decorate', body: 'Cover the outside with decorative paper or leave it natural. Your desk organizer is ready to use.', icon: 'sparkles' },
    ],
  },
  {
    id: 'tut-cardboard-wall-art',
    title: 'Layered Cardboard Wall Art',
    description:
      'Stack and cut recycled cardboard into a bold geometric piece that adds texture to any room.',
    category: 'paper',
    difficulty: 'Easy',
    budgetInr: 120,
    itemsReused: 4,
    timeMinutes: 90,
    image: 'https://images.pexels.com/photos/7218114/pexels-photo-7218114.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Person arranging cardboard pieces on a wall',
    materials: ['3 to 4 sheets of cardboard', 'White or coloured acrylic paint', 'Strong glue', 'Picture hanging strip'],
    tools: ['Craft knife', 'Pencil and compass', 'Paintbrush', 'Cutting mat'],
    steps: [
      { title: 'Sketch the design', body: 'Draw a simple shape such as a circle, arch or sunburst on a sheet of paper at the size you want the finished piece.', icon: 'ruler' },
      { title: 'Cut the layers', body: 'Trace the design onto each cardboard sheet and cut out the pieces. Make each layer slightly smaller than the one below it.', icon: 'scissors' },
      { title: 'Glue the layers', body: 'Glue the pieces together in order, centring each layer so the stacked edges create depth.', icon: 'layers' },
      { title: 'Paint the surface', body: 'Apply two thin coats of paint, letting each dry fully. A dry brush over the ridges adds nice texture.', icon: 'brush' },
      { title: 'Let it set', body: 'Leave the piece flat under a weight for a few hours so the glue cures and the layers stay flat.', icon: 'package' },
      { title: 'Hang it up', body: 'Attach a picture hanging strip to the back, centred near the top, and hang the piece on the wall.', icon: 'check' },
    ],
  },
  {
    id: 'tut-glass-jar-candle-holder',
    title: 'Glass Jar Candle Holder',
    description:
      'Dress up clean glass jars with twine and a tealight for warm, cosy lighting at home.',
    category: 'glass',
    difficulty: 'Easy',
    budgetInr: 90,
    itemsReused: 3,
    timeMinutes: 35,
    image: 'https://images.pexels.com/photos/15840176/pexels-photo-15840176.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Scented candles and pumpkins on a rustic wooden table',
    materials: ['2 to 3 clean glass jars with lids removed', 'Jute twine', 'Strong craft glue', 'Tealight candles or LED tealights'],
    tools: ['Scissors', 'Paintbrush for glue'],
    steps: [
      { title: 'Clean and dry the jars', body: 'Soak the jars in warm soapy water to remove labels and sticky residue. Dry them fully and check the rims are smooth.', icon: 'droplets' },
      { title: 'Cut the twine', body: 'Measure enough twine to wrap around each jar about three times, then cut it to length.', icon: 'scissors' },
      { title: 'Glue the base', body: 'Brush a thin line of craft glue around the bottom of the jar and start wrapping the twine from the base upward.', icon: 'brush' },
      { title: 'Wrap the jar', body: 'Keep the wraps close together and tight. Glue the end on the inside of the jar and let it dry.', icon: 'layers' },
      { title: 'Let it dry', body: 'Leave the jars to dry overnight so the glue sets fully before handling them.', icon: 'package' },
      { title: 'Place a tealight', body: 'Use LED tealights for safety. Never leave a real flame unattended and keep the holder away from curtains.', icon: 'sparkles' },
    ],
  },
  {
    id: 'tut-wooden-crate-bookshelf',
    title: 'Wooden Crate Bookshelf',
    description:
      'Stack and secure old wooden crates into a rustic bookshelf that holds up to 25 kg per shelf.',
    category: 'wood',
    difficulty: 'Hard',
    budgetInr: 350,
    itemsReused: 3,
    timeMinutes: 90,
    image: 'https://images.pexels.com/photos/6446312/pexels-photo-6446312.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Wooden shelving filled with decor',
    materials: ['3 to 4 wooden crates of the same size', 'Wood screws, 40 mm', 'Wood glue', 'Sandpaper (120 and 220 grit)', 'Wall anchors and brackets'],
    tools: ['Drill with driver bit', 'Spirit level', 'Measuring tape', 'Clamps', 'Stud finder'],
    steps: [
      { title: 'Inspect the crates', body: 'Check each crate for cracks or rot. Pull out any broken slats and sand rough edges smooth.', icon: 'sparkles' },
      { title: 'Plan the stack', body: 'Decide the layout and mark the wall position. Use a stud finder and mark the top and bottom of the bookshelf.', icon: 'ruler' },
      { title: 'Glue and clamp', body: 'Apply wood glue to the joints where crates meet. Clamp the crates together and leave them to set for at least 2 hours.', icon: 'wrench' },
      { title: 'Screw the joints', body: 'Drive two screws through each joint from the outside. Pre-drill the holes to avoid splitting the wood.', icon: 'hammer' },
      { title: 'Fix to the wall', body: 'Level the unit, then secure it to the wall with brackets into studs or heavy-duty anchors. Never skip this step on a tall shelf.', icon: 'hammer' },
      { title: 'Finish the wood', body: 'Wipe off dust, apply a coat of natural wood oil or wax and let it dry before loading books.', icon: 'brush' },
    ],
  },
];

export function getTutorial(id: string): Tutorial | undefined {
  return tutorials.find((t) => t.id === id);
}
