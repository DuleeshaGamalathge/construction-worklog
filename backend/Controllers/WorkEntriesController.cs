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

    // GET: api/workentries
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var entries = await _context.WorkEntries
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
}