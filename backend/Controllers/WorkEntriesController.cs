using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;
using backend.DTOs;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class WorkEntriesController : ControllerBase
{
    private readonly AppDbContext _context;

    public WorkEntriesController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/workentries/
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery] DateTime? from,
        [FromQuery] DateTime? to
    ){
        var query = _context.WorkEntries.AsQueryable();

        if (from.HasValue)
        {
            query = query.Where(x => x.Date >= from.Value);
        }

        if (to.HasValue)
        {
            query = query.Where(x => x.Date <= to.Value);
        }

        var entries = await query
            .OrderByDescending(x => x.Date)
            .ToListAsync();

        return Ok(entries);
    }

    // POST: api/workentries
    [HttpPost]
    public async Task<IActionResult> Create(WorkEntryDto dto)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        if (dto.Date.Date > DateTime.Today)
        {
            return BadRequest("Date cannot be in the future.");
        }

        var entry = new WorkEntry
        {
            Date = dto.Date,
            WorkType = dto.WorkType,
            Volume = dto.Volume,
            Unit = dto.Unit,
            Performer = dto.Performer
        };

        _context.WorkEntries.Add(entry);
        await _context.SaveChangesAsync();

        return Ok(entry);
    }

    // DELETE: api/workentries/{id}
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var entry = await _context.WorkEntries.FindAsync(id);

        if (entry == null)
            return NotFound();

        _context.WorkEntries.Remove(entry);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Deleted successfully" });
    }

    //PUT
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, WorkEntryDto dto)
    {
        var entry = await _context.WorkEntries.FindAsync(id);

        if (entry == null)
            return NotFound();

        if (dto.Date.Date > DateTime.Today)
        {
            return BadRequest("Date cannot be in the future.");
        }

        entry.Date = dto.Date;
        entry.WorkType = dto.WorkType;
        entry.Volume = dto.Volume;
        entry.Unit = dto.Unit;
        entry.Performer = dto.Performer;

        await _context.SaveChangesAsync();

        return Ok(entry);
    }
}