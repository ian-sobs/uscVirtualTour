# Virtual Tour Setup Guide

## How to Add Virtual Tours

Your virtual tours now use **Google Maps Street View API** instead of iframes. This works with your existing Google Maps API key.

### Method 1: Using Panorama ID (Recommended)

1. Go to Google Maps Street View at your desired location
2. Copy the panorama ID from the URL:
   ```
   https://www.google.com/maps/@10.352,123.913,3a,75y,90h,90t/data=!3m6!1e1!3m4!1sCAoSLEFGMVFpcFBnVDRRRDB...
   ```
   The `1s` parameter contains the pano ID: `CAoSLEFGMVFpcFBnVDRRRDB...`

3. In the admin panel, enter the Panorama ID
4. Adjust heading (0-360°), pitch (-90 to 90°), and zoom (0-5)

### Method 2: Using Coordinates

If you don't have a pano ID, use latitude and longitude:
1. Enter the coordinates where Street View is available
2. Google will automatically find the nearest Street View panorama
3. Adjust viewing angles as needed

## Camera Controls

- **Heading**: Direction the camera is facing (0° = North, 90° = East, 180° = South, 270° = West)
- **Pitch**: Vertical angle (-90° = looking down, 0° = straight ahead, 90° = looking up)
- **Zoom**: Magnification level (0 = zoomed out, 5 = zoomed in)

## Tips

- Test your panorama in Google Maps first to get the right pano ID
- Use heading to point toward important features
- Set pitch to 0 for most indoor tours
- Zoom level 1 works well for most cases

## Finding Panorama IDs

1. Open Google Maps
2. Enter Street View at your location
3. Right-click and select "Copy link address"
4. Look for the pano parameter in the URL
