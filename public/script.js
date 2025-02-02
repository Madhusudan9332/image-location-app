document.getElementById('imageSelect').addEventListener('change', function() {
    const img = document.getElementById('currentImage');
    img.src = `images/${this.value}`;
    img.classList.add('blur');
});

document.getElementById('setLocation').addEventListener('click', () => {
    const imageName = document.getElementById('imageSelect').value;
    
    if (!imageName) {
        alert('Please select an image first!');
        return;
    }

    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const response = await fetch('/api/locations', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        imageName: imageName
                    })
                });

                if (response.ok) {
                    document.getElementById('currentImage').classList.remove('blur');
                } else {
                    alert('Failed to save location');
                }
            } catch (error) {
                console.error('Error:', error);
                alert('Error saving location');
            }
        },
        (error) => {
            alert(`Error getting location: ${error.message}`);
        }
    );
});
