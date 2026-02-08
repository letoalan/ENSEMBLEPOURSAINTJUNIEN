# Create directories
New-Item -ItemType Directory -Force -Path "assets/fonts/montserrat"
New-Item -ItemType Directory -Force -Path "assets/fonts/fontawesome"

# Define downloads
$fonts = @(
    @{ url = "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-.ttf"; dest = "assets/fonts/montserrat/Montserrat-Regular.ttf" },
    @{ url = "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w-.ttf"; dest = "assets/fonts/montserrat/Montserrat-SemiBold.ttf" },
    @{ url = "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM70w-.ttf"; dest = "assets/fonts/montserrat/Montserrat-Bold.ttf" },
    @{ url = "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr70w-.ttf"; dest = "assets/fonts/montserrat/Montserrat-ExtraBold.ttf" },
    @{ url = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-solid-900.woff2"; dest = "assets/fonts/fontawesome/fa-solid-900.woff2" },
    @{ url = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-brands-400.woff2"; dest = "assets/fonts/fontawesome/fa-brands-400.woff2" },
    @{ url = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/webfonts/fa-regular-400.woff2"; dest = "assets/fonts/fontawesome/fa-regular-400.woff2" }
)

# Download loop
foreach ($font in $fonts) {
    Write-Host "Downloading $($font.dest)..."
    Invoke-WebRequest -Uri $font.url -OutFile $font.dest
}

Write-Host "Downloads complete."
