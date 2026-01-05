<?php
/**
 * Static Portfolio Generator for GitHub Pages
 * This script processes cv.json and styles.css to produce a static index.html
 */

// 1. Configuration
$jsonPath = __DIR__ . '/cv.json';
$cssPath  = __DIR__ . '/css/styles.css'; // Path to your compiled CSS
$outputPath = __DIR__ . '/index.html';

// 2. Data Loading
if (!file_exists($jsonPath)) {
    die("Error: cv.json not found.\n");
}
$data = json_decode(file_get_contents($jsonPath), true);

// 3. CSS Loading
// We read the CSS file directly as requested.
$customCSS = "";
if (file_exists($cssPath)) {
    $customCSS = file_get_contents($cssPath);
} else {
    echo "Warning: styles.css not found. The output might look unstyled.\n";
}

// 4. Helper for dates
function get_date($item) {
    if (isset($item['date'])) return $item['date'];
    $from = $item['date from'] ?? '';
    $until = $item['date until'] ?? 'Present';
    return "$from - $until";
}

// 5. Start Buffer to capture HTML output
ob_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($data['name']) ?> | Portfolio</title>
    <style>
        /* Injected from styles.css */
        <?= $customCSS ?>
    </style>
</head>
<body>

    <nav id="navbar" open>
        <a class="name" href="https://github.com/<?= urlencode($data['contact']['github'] ?? 'sirtoby-gore') ?>"><?= htmlspecialchars($data['name']) ?></a>
        <ul class="links">
            <li><a href="#about">About</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#achievements">Achievements</a></li>
            <li><a href="#contact">Contact</a></li>
        </ul>
    </nav>

    <main>
        <!-- About Section -->
        <section id="about" class="box">
            <h2 class="title">About Me</h2>
            <div class="sub-text">
                <p><?= htmlspecialchars($data['about me']) ?></p>
            </div>
        </section>

        <!-- Experience Section -->
        <section id="experience" class="box">
            <h2 class="title">Work Experience</h2>
            <?php foreach ($data['experiences'] as $index => $exp): ?>
                <div class="entry">
                    <div class="sub-title">
                        <span class="info"><?= htmlspecialchars($exp['title']) ?></span>
                        <span class="info"><?= htmlspecialchars($exp['location'] ?? 'Remote') ?></span>
                        <span class="info"><?= get_date($exp) ?></span>
                    </div>
                    <p class="description"><?= htmlspecialchars($exp['description']) ?></p>
                </div>
                <?php if ($index < count($data['experiences']) - 1): ?>
                    <hr>
                <?php endif; ?>
            <?php endforeach; ?>
        </section>

        <!-- Achievements Section -->
        <section id="achievements" class="box">
            <h2 class="title">Achievements & Activities</h2>
            <?php foreach ($data['other'] as $index => $item): ?>
                <div class="entry">
                    <div class="sub-title">
                        <span class="info"><?= htmlspecialchars($item['title']) ?></span>
                        <span class="info"><?= get_date($item) ?></span>
                    </div>
                    <p class="description"><?= htmlspecialchars($item['description']) ?></p>
                </div>
                <?php if ($index < count($data['other']) - 1): ?>
                    <hr>
                <?php endif; ?>
            <?php endforeach; ?>
        </section>

        <!-- Contact Section -->
        <section id="contact" class="box">
            <h2 class="title">Contact</h2>
            <div class="contact-list">
                <?php if (isset($data['contact']['email'])): ?>
                <div class="contact">
                    <span>Email:</span>
                    <a href="mailto:<?= $data['contact']['email'] ?>"><?= htmlspecialchars($data['contact']['email']) ?></a>
                </div>
                <?php endif; ?>

                <?php if (isset($data['contact']['phone'])): ?>
                <div class="contact">
                    <span>Phone:</span>
                    <span><?= htmlspecialchars($data['contact']['phone']) ?></span>
                </div>
                <?php endif; ?>

                <?php if (isset($data['contact']['linkedin href'])): ?>
                <div class="contact">
                    <span>LinkedIn:</span>
                    <a href="<?= htmlspecialchars($data['contact']['linkedin href']) ?>" target="_blank">Connect with me</a>
                </div>
                <?php endif; ?>

                <?php if (isset($data['contact']['github'])): ?>
                <div class="contact">
                    <span>Github:</span>
                    <a href="https://github/<?= urlencode($data['contact']['github']) ?>" target="_blank">Connect with me</a>
                </div>
                <?php endif; ?>
            </div>
        </section>
    </main>

    <script>
        // Smooth scroll and Navbar behavior logic
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.removeAttribute('open');
            } else {
                navbar.setAttribute('open', '');
            }
        });
    </script>
</body>
</html>
<?php
// 6. Capture the buffer and save to index.html
$htmlContent = ob_get_clean();
file_put_contents($outputPath, $htmlContent);

echo "Success! Generated static portfolio at: $outputPath\n";
?>