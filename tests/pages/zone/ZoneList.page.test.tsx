import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ZoneList from '../../../src/pages/zone/ZoneList.page';

vi.mock('../../../src/api/index', () => ({
  default: {
    get: vi.fn(),
    delete: vi.fn(),
  },
}));

vi.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div>{children}</div>,
  TileLayer: () => <div>TileLayer</div>,
  Circle: ({ children }) => <div>{children}</div>,
  Popup: ({ children }) => <div>{children}</div>,
}));

const mockZones = [
  { id: '1', name: 'Zone One', latitude: 1.3521, longitude: 103.8198, radius: 500 },
  { id: '2', name: 'Zone Two', latitude: 1.3521, longitude: 103.8198, radius: 1000 },
];

describe('ZoneList Component', () => {
  let api;

  beforeEach(async () => {
    api = (await import('../../../src/api/index')).default;
    vi.clearAllMocks();
    vi.spyOn(window, 'confirm').mockReturnValue(true);
  });

  it('should fetch and display zones', async () => {
    api.get.mockResolvedValueOnce({ data: mockZones });

    render(
      <MemoryRouter>
        <ZoneList />
      </MemoryRouter>
    );

    expect(await screen.findByText('Zone One')).toBeInTheDocument();
    expect(await screen.findByText('Zone Two')).toBeInTheDocument();
  });

  it('should handle fetch error', async () => {
    api.get.mockRejectedValueOnce(new Error('Failed to fetch'));

    render(
      <MemoryRouter>
        <ZoneList />
      </MemoryRouter>
    );

    expect(await screen.findByText(/failed to fetch zones/i)).toBeInTheDocument();
  });

  it('should toggle sort order when clicking on name header', async () => {
    api.get.mockResolvedValueOnce({ data: [
      { id: '1', name: 'Zone B', latitude: 1.3521, longitude: 103.8198, radius: 500 },
      { id: '2', name: 'Zone A', latitude: 1.3521, longitude: 103.8198, radius: 1000 },
    ]});

    render(
      <MemoryRouter>
        <ZoneList />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/name/i));
    expect(await screen.findByText('Zone A')).toBeInTheDocument();

    fireEvent.click(screen.getByText(/name/i));
    expect(await screen.findByText('Zone B')).toBeInTheDocument();
  });

  it('should display a message when no zones are found', async () => {
    api.get.mockResolvedValueOnce({ data: [] });

    render(
      <MemoryRouter>
        <ZoneList />
      </MemoryRouter>
    );

    expect(await screen.findByText(/no zones found/i)).toBeInTheDocument();
  });

  it('should handle zone deletion', async () => {
    api.get.mockResolvedValueOnce({ data: mockZones });
    const deleteSpy = vi.spyOn(api, 'delete').mockResolvedValueOnce({});

    render(
      <MemoryRouter>
        <ZoneList />
      </MemoryRouter>
    );

    expect(await screen.findByText('Zone One')).toBeInTheDocument();

    const faTrashIcon = document.getElementById('trash-1');
    
    expect(faTrashIcon).toBeInTheDocument();

    fireEvent.click(faTrashIcon);

    await waitFor(() => {
      expect(deleteSpy).toHaveBeenCalledWith('/zones/1');
      expect(screen.queryByText('Zone One')).toBeNull();
    });
  });
});
