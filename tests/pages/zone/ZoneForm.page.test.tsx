import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ZoneForm from '../../../src/pages/zone/ZoneForm.page';

vi.mock('../../../src/api/index', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div>{children}</div>,
  TileLayer: () => <div>TileLayer</div>,
  Marker: () => <div>Marker</div>,
  Popup: () => <div>Popup</div>,
  Circle: () => <div>Circle</div>,
}));

const mockZoneData = {
  id: '1',
  name: 'Test Zone',
  latitude: 1.3521,
  longitude: 103.8198,
  radius: 500,
};

describe('ZoneForm Component', () => {
  let api;

  beforeEach(async () => {
    api = (await import('../../../src/api/index')).default;
    vi.clearAllMocks();
  });

  it('should fetch zone data in edit mode', async () => {
    api.get.mockResolvedValueOnce({ data: mockZoneData });

    render(
      <MemoryRouter initialEntries={['/zones/1']}>
        <Routes>
          <Route path="/zones/:id" element={<ZoneForm />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue(mockZoneData.name)).toBeInTheDocument();
      expect(screen.getByDisplayValue(String(mockZoneData.latitude))).toBeInTheDocument();
      expect(screen.getByDisplayValue(String(mockZoneData.longitude))).toBeInTheDocument();
      expect(screen.getByDisplayValue(String(mockZoneData.radius))).toBeInTheDocument();
    });
  });

  it('should handle fetch zone data error', async () => {
    api.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <MemoryRouter initialEntries={['/zones/1']}>
        <Routes>
          <Route path="/zones/:id" element={<ZoneForm />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/name/i)).toHaveValue('');
      expect(screen.getByLabelText(/latitude/i)).toHaveValue(null);
      expect(screen.getByLabelText(/longitude/i)).toHaveValue(null);
      expect(screen.getByLabelText(/radius/i)).toHaveValue(0);
    });
  });

  it('should handle zone creation', async () => {
    api.post.mockResolvedValueOnce({ status: 200 });

    render(
      <MemoryRouter initialEntries={['/zones/new']}>
        <Routes>
          <Route path="/zones/new" element={<ZoneForm />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Zone' } });
    fireEvent.change(screen.getByLabelText(/latitude/i), { target: { value: '1.3521' } });
    fireEvent.change(screen.getByLabelText(/longitude/i), { target: { value: '103.8198' } });
    fireEvent.change(screen.getByLabelText(/radius/i), { target: { value: '500' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalledWith('/zones', {
        name: 'New Zone',
        latitude: 1.3521,
        longitude: 103.8198,
        radius: 500,
      });
    });
  });

  it('should handle zone creation error', async () => {
    api.post.mockRejectedValueOnce(new Error('Failed to create'));

    render(
      <MemoryRouter initialEntries={['/zones/new']}>
        <Routes>
          <Route path="/zones/new" element={<ZoneForm />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'New Zone' } });
    fireEvent.change(screen.getByLabelText(/latitude/i), { target: { value: '1.3521' } });
    fireEvent.change(screen.getByLabelText(/longitude/i), { target: { value: '103.8198' } });
    fireEvent.change(screen.getByLabelText(/radius/i), { target: { value: '500' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    await waitFor(() => {
      expect(api.post).toHaveBeenCalled();
    });
  });

  it('should handle zone update', async () => {
    api.get.mockResolvedValueOnce({ data: mockZoneData });
    api.put.mockResolvedValueOnce({ status: 200 });

    render(
      <MemoryRouter initialEntries={['/zones/1']}>
        <Routes>
          <Route path="/zones/:id" element={<ZoneForm />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue(mockZoneData.name)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Updated Zone' } });
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(api.put).toHaveBeenCalledWith('/zones/1', {
        name: 'Updated Zone',
        latitude: mockZoneData.latitude,
        longitude: mockZoneData.longitude,
        radius: mockZoneData.radius,
      });
    });
  });

  it('should handle zone update error', async () => {
    api.get.mockResolvedValueOnce({ data: mockZoneData });
    api.put.mockRejectedValueOnce(new Error('Failed to update'));

    render(
      <MemoryRouter initialEntries={['/zones/1']}>
        <Routes>
          <Route path="/zones/:id" element={<ZoneForm />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue(mockZoneData.name)).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Updated Zone' } });
    fireEvent.click(screen.getByRole('button', { name: /update/i }));

    await waitFor(() => {
      expect(api.put).toHaveBeenCalled();
    });
  });

  it('should render the map with markers and circle', async () => {
    api.get.mockResolvedValueOnce({ data: mockZoneData });
  
    render(
      <MemoryRouter initialEntries={['/zones/1']}>
        <Routes>
          <Route path="/zones/:id" element={<ZoneForm />} />
        </Routes>
      </MemoryRouter>
    );
  
    await waitFor(() => {
      expect(screen.getByDisplayValue(mockZoneData.name)).toBeInTheDocument();
    });
  
    expect(screen.getByDisplayValue(String(mockZoneData.latitude))).toBeInTheDocument();
    expect(screen.getByDisplayValue(String(mockZoneData.longitude))).toBeInTheDocument();
  });
  

  it('should display default values for a new zone', () => {
    render(
      <MemoryRouter initialEntries={['/zones/new']}>
        <Routes>
          <Route path="/zones/new" element={<ZoneForm />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/name/i)).toHaveValue('');
    expect(screen.getByLabelText(/latitude/i)).toHaveValue(null);
    expect(screen.getByLabelText(/longitude/i)).toHaveValue(null);
    expect(screen.getByLabelText(/radius/i)).toHaveValue(0);
  });

  it('should render the Circle component based on latitude, longitude, and radius', async () => {
    api.get.mockResolvedValueOnce({ data: mockZoneData });

    render(
      <MemoryRouter initialEntries={['/zones/1']}>
        <Routes>
          <Route path="/zones/:id" element={<ZoneForm />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue(mockZoneData.name)).toBeInTheDocument();
    });

    expect(screen.getByText(/Circle/i)).toBeInTheDocument();
  });
});
