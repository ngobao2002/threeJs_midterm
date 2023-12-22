let camera, scene, renderer, snowflakes, christmasTrees;

init();
animate();

function init() {
    // Set up the scene
    scene = new THREE.Scene();

    // Set up the camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 50;

    // Set up the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Create snowflakes
    snowflakes = createSnowflakes();
    scene.add(snowflakes);

    // Create Christmas Trees
    createChristmasTrees();

    // Handle window resizing
    window.addEventListener('resize', onWindowResize);
}

function createSnowflakes() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];

    // Use a texture for the snowflake
    const snowflakeTexture = new THREE.TextureLoader().load('assets/pToArjn9c.png');

    for (let i = 0; i < 1500; i++) {
        const x = (Math.random() - 0.5) * 200;
        const y = (Math.random() - 0.5) * 200;
        const z = (Math.random() - 0.5) * 200;

        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        size: 1,
        map: snowflakeTexture,
        transparent: true,
    });

    const snowflakes = new THREE.Points(geometry, material);

    return snowflakes;
}

function createChristmasTrees() {
    christmasTrees = new THREE.Group();

    const treePositions = [
        { x: -15, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 15, y: 0, z: 0 },
    ];

    for (let i = 0; i < treePositions.length; i++) {
        const tree = createChristmasTree();
        tree.position.set(treePositions[i].x, treePositions[i].y, treePositions[i].z);
        christmasTrees.add(tree);
    }

    scene.add(christmasTrees);
}

function createChristmasTree() {
    const tree = new THREE.Group();

    // Trunk
    const trunkGeometry = new THREE.BoxGeometry(2, 4, 2);
    const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 }); // Brown color
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = -2;
    tree.add(trunk);

    // Tree tiers
    const tierColors = [0x228B22, 0x228B22, 0x228B22, 0x228B22]; // Green colors
    const numTiers = 4;
    const baseSize = 8;

    for (let i = 0; i < numTiers; i++) {
        const tierSize = baseSize - i * 2; // Reduce tier size as it goes higher

        // Use a texture for the tree tier
        const tierTexture = new THREE.TextureLoader().load('assets/arid2_bk.jpg');
        const tierMaterial = new THREE.MeshBasicMaterial({ map: tierTexture, color: tierColors[i] });

        const tierGeometry = new THREE.ConeGeometry(tierSize, 10, 8);
        const tier = new THREE.Mesh(tierGeometry, tierMaterial);
        tier.position.y = 4 + i * 8; // Adjust vertical position of each tier
        tree.add(tier);
    }

    return tree;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate the snowflakes
    snowflakes.rotation.y += 0.001;

    // Rotate the Christmas trees
    if (christmasTrees) {
        christmasTrees.rotation.y += 0.005;
    }

    renderer.render(scene, camera);
}
